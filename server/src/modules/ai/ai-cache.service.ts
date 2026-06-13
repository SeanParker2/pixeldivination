import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

let Redis: typeof import('ioredis').default | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Redis = require('ioredis').default;
} catch {
  // ioredis not available, will use in-memory fallback
}

interface CacheEntry {
  response: string;
  expiresAt: number;
}

// TTL in seconds for different cache types
const CACHE_TTL: Record<string, number> = {
  tarot: 24 * 60 * 60,       // 24 hours
  natal: 7 * 24 * 60 * 60,   // 7 days
  synastry: 7 * 24 * 60 * 60, // 7 days
  fortune: 24 * 60 * 60,      // 24 hours
  chat: 0,                     // no cache
};

@Injectable()
export class AiCacheService implements OnModuleDestroy {
  private readonly logger = new Logger(AiCacheService.name);
  private redis: InstanceType<typeof Redis> | null = null;
  private memoryCache = new Map<string, CacheEntry>();
  private readonly PREFIX = 'ai_cache:';

  constructor(private config: ConfigService) {
    const redisUrl = this.config.get('REDIS_URL');
    if (Redis && redisUrl) {
      try {
        this.redis = new Redis(redisUrl, {
          maxRetriesPerRequest: 1,
          retryStrategy: (times) => {
            if (times > 3) return null; // stop retrying
            return Math.min(times * 200, 2000);
          },
          lazyConnect: true,
          enableReadyCheck: false,
        });
        this.redis.connect().catch(() => {
          this.logger.warn('Redis connection failed, falling back to in-memory cache');
          this.redis = null;
        });
        this.logger.log('Redis cache initialized');
      } catch {
        this.logger.warn('Redis initialization failed, using in-memory cache');
        this.redis = null;
      }
    } else {
      this.logger.log('No REDIS_URL configured, using in-memory cache');
    }
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit().catch(() => {});
    }
  }

  /**
   * Generate a cache key from the input parameters
   */
  generateKey(type: string, input: Record<string, unknown>): string {
    const hash = createHash('sha256')
      .update(JSON.stringify(input))
      .digest('hex')
      .slice(0, 16);
    return `${this.PREFIX}${type}:${hash}`;
  }

  /**
   * Get cached response
   */
  async get(type: string, input: Record<string, unknown>): Promise<string | null> {
    const ttl = CACHE_TTL[type];
    if (ttl === 0) return null; // no cache for this type

    const key = this.generateKey(type, input);

    try {
      if (this.redis) {
        const cached = await this.redis.get(key);
        if (cached) {
          this.logger.debug(`Cache HIT (redis): ${key}`);
          return cached;
        }
      } else {
        const entry = this.memoryCache.get(key);
        if (entry && entry.expiresAt > Date.now()) {
          this.logger.debug(`Cache HIT (memory): ${key}`);
          return entry.response;
        }
        if (entry) {
          this.memoryCache.delete(key);
        }
      }
    } catch (error) {
      this.logger.warn('Cache get error:', error);
    }

    return null;
  }

  /**
   * Set cached response
   */
  async set(type: string, input: Record<string, unknown>, response: string): Promise<void> {
    const ttl = CACHE_TTL[type];
    if (ttl === 0) return; // no cache for this type

    const key = this.generateKey(type, input);

    try {
      if (this.redis) {
        await this.redis.setex(key, ttl, response);
        this.logger.debug(`Cache SET (redis): ${key}, TTL: ${ttl}s`);
      } else {
        this.memoryCache.set(key, {
          response,
          expiresAt: Date.now() + ttl * 1000,
        });
        this.logger.debug(`Cache SET (memory): ${key}, TTL: ${ttl}s`);

        // Evict expired entries periodically
        if (this.memoryCache.size > 1000) {
          this.evictExpired();
        }
      }
    } catch (error) {
      this.logger.warn('Cache set error:', error);
    }
  }

  /**
   * Check if caching is enabled for a type
   */
  isCacheable(type: string): boolean {
    return (CACHE_TTL[type] ?? 0) > 0;
  }

  /**
   * Get cache stats
   */
  async getStats(): Promise<{ type: 'redis' | 'memory'; size: number }> {
    if (this.redis) {
      try {
        const keys = await this.redis.keys(`${this.PREFIX}*`);
        return { type: 'redis', size: keys.length };
      } catch {
        return { type: 'redis', size: -1 };
      }
    }
    return { type: 'memory', size: this.memoryCache.size };
  }

  private evictExpired() {
    const now = Date.now();
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.expiresAt <= now) {
        this.memoryCache.delete(key);
      }
    }
  }
}
