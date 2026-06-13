# Pixel Divination 技术架构与实施方案

> **版本**：v1.0  
> **更新日期**：2026-06-13  
> **文档性质**：系统架构设计 + 技术实施方案

---

## 一、架构总览

### 1.1 架构原则

| 原则 | 说明 |
|------|------|
| **安全优先** | API Key 不暴露前端、用户数据加密、最小权限 |
| **成本可控** | AI 调用限流、结果缓存、按需计费 |
| **可扩展** | 模块化设计、新占卜体系可插拔接入 |
| **高性能** | 星盘本地计算、AI 结果缓存、CDN 加速 |
| **渐进式** | 从单体到微服务，按业务规模演进 |

### 1.2 系统架构图

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              客户端层                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │  Web App     │  │  PWA         │  │  微信小程序  │                 │
│  │  (React)     │  │  (离线支持)  │  │  (Uni-app)   │                 │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                 │
│         └─────────────────┴─────────────────┘                          │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │ HTTPS + WebSocket
┌─────────────────────────────┴───────────────────────────────────────────┐
│                            接入层                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │  Nginx       │  │  CDN         │  │  SSL/TLS     │                 │
│  │  (反向代理)  │  │  (静态资源)  │  │  (证书)      │                 │
│  └──────┬───────┘  └──────────────┘  └──────────────┘                 │
└─────────┬───────────────────────────────────────────────────────────────┘
          │
┌─────────┴───────────────────────────────────────────────────────────────┐
│                          API 网关层                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │  认证鉴权    │  │  限流熔断    │  │  请求路由    │                 │
│  │  (JWT+OAuth) │  │  (令牌桶)    │  │  (版本控制)  │                 │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                 │
│         └─────────────────┴─────────────────┘                          │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────────────┐
│                           业务服务层                                     │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ 用户服务   │ │ 占星服务   │ │ 占卜服务   │ │ AI 服务    │          │
│  │ User       │ │ Astrology  │ │ Divination │ │ AI         │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ 运势服务   │ │ 命理服务   │ │ 商城服务   │ │ 社区服务   │          │
│  │ Fortune    │ │ Metaphysics│ │ Shop       │ │ Community  │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────────────┐
│                           数据层                                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ PostgreSQL │ │ Redis      │ │ S3/OSS     │ │ Elastic    │          │
│  │ (主数据库) │ │ (缓存)     │ │ (文件存储) │ │ (搜索)     │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────┴───────────────────────────────────────────┐
│                          外部服务层                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ DeepSeek   │ │ 通义千问   │ │ Moonshot   │ │ 微信支付   │          │
│  │ (主力AI)   │ │ (备选)     │ │ (备选)     │ │ (支付)     │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 二、技术选型

### 2.1 技术栈总览

| 层级 | 技术 | 选型理由 |
|------|------|----------|
| **前端** | React 19 + TypeScript + Vite | 现有基础，生态成熟 |
| **状态管理** | Zustand | 轻量、TypeScript 友好 |
| **样式** | Tailwind CSS v4 | 快速开发、主题化 |
| **动画** | Framer Motion | React 动画生态最佳 |
| **后端框架** | NestJS (Node.js) | TypeScript 全栈、模块化、企业级 |
| **数据库** | PostgreSQL | 可靠、JSON 支持、扩展性强 |
| **缓存** | Redis | 高性能缓存、会话管理 |
| **ORM** | Prisma | 类型安全、迁移方便 |
| **认证** | JWT + OAuth 2.0 | 无状态、支持第三方登录 |
| **AI 代理** | 自建代理层 | 多模型切换、成本控制 |
| **文件存储** | 阿里云 OSS / AWS S3 | 可靠、CDN 加速 |
| **部署** | Docker + PM2 | 容器化、进程管理 |
| **CI/CD** | GitHub Actions | 自动化测试部署 |

### 2.2 选型对比

#### 后端框架对比
| 框架 | 优势 | 劣势 | 选择 |
|------|------|------|------|
| **NestJS** | 模块化、TS 全栈、企业级 | 学习曲线 | ✅ 选择 |
| Express | 简单、灵活 | 缺乏结构 | ❌ |
| Fastify | 高性能 | 生态较小 | ❌ |
| Go (Gin) | 高并发 | 团队不熟悉 | ❌ 后期可迁移 |

#### 数据库对比
| 数据库 | 优势 | 劣势 | 选择 |
|--------|------|------|------|
| **PostgreSQL** | 功能全、JSON 支持 | 配置复杂 | ✅ 选择 |
| MySQL | 简单、流行 | 功能较少 | ❌ |
| MongoDB | 灵活 | 事务支持弱 | ❌ |

---

## 三、数据库设计

### 3.1 ER 关系图

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    users     │──────<│ user_charts  │──────>│   charts     │
│              │       │              │       │              │
└──────┬───────┘       └──────────────┘       └──────────────┘
       │
       ├──────<┌──────────────┐
       │       │ subscriptions│
       │       └──────────────┘
       │
       ├──────<┌──────────────┐
       │       │ divinations  │
       │       └──────────────┘
       │
       ├──────<┌──────────────┐
       │       │  fortunes    │
       │       └──────────────┘
       │
       └──────<┌──────────────┐
               │   orders     │
               └──────────────┘
```

### 3.2 核心表结构

#### 用户表 (users)
```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone         VARCHAR(20) UNIQUE,
  email         VARCHAR(255) UNIQUE,
  nickname      VARCHAR(50) NOT NULL,
  avatar_url    TEXT,
  gender        VARCHAR(10),  -- male/female/other
  birth_date    DATE,
  birth_time    TIME,
  birth_city    VARCHAR(100),
  birth_lat     DECIMAL(10, 7),
  birth_lng     DECIMAL(10, 7),
  zodiac_sign   VARCHAR(20),  -- 缓存的星座
  kua_number    SMALLINT,     -- 缓存的命卦
  timezone      VARCHAR(50) DEFAULT 'Asia/Shanghai',
  is_premium    BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
```

#### 星盘表 (charts)
```sql
CREATE TABLE charts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  name          VARCHAR(100),  -- "我的本命盘"、"与小明的合盘"
  chart_type    VARCHAR(20) NOT NULL,  -- natal/synastry/transit/solar
  birth_date    DATE NOT NULL,
  birth_time    TIME,
  birth_city    VARCHAR(100),
  birth_lat     DECIMAL(10, 7),
  birth_lng     DECIMAL(10, 7),
  -- 合盘专用
  partner_birth_date DATE,
  partner_birth_time TIME,
  partner_birth_city VARCHAR(100),
  -- 计算结果缓存
  planets       JSONB NOT NULL,  -- 行星位置数据
  houses        JSONB NOT NULL,  -- 宫位数据
  aspects       JSONB NOT NULL,  -- 相位数据
  ascendant     DECIMAL(6, 2),
  midheaven     DECIMAL(6, 2),
  -- AI 解读缓存
  ai_reading    TEXT,
  ai_reading_at TIMESTAMPTZ,
  is_public     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_charts_user_id ON charts(user_id);
CREATE INDEX idx_charts_type ON charts(chart_type);
```

#### 占卜记录表 (divinations)
```sql
CREATE TABLE divinations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  div_type      VARCHAR(20) NOT NULL,  -- tarot/lenormand/bazi/numerology
  -- 塔罗/雷诺曼专用
  deck_type     VARCHAR(50),  -- rider_waite/marseille/thoth
  spread_type   VARCHAR(50),  -- single/three_card/celtic_cross
  cards         JSONB,        -- 抽到的牌及位置
  -- 八字专用
  bazi_data     JSONB,        -- 四柱数据
  -- 问题与解读
  question      TEXT,
  ai_reading    TEXT,
  ai_persona    VARCHAR(20),  -- neon/forest/dragon
  -- 元数据
  is_free       BOOLEAN DEFAULT TRUE,  -- 是否免费次数
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_divinations_user_id ON divinations(user_id);
CREATE INDEX idx_divinations_type ON divinations(div_type);
CREATE INDEX idx_divinations_created ON divinations(created_at DESC);
```

#### 运势记录表 (fortunes)
```sql
CREATE TABLE fortunes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  zodiac_sign   VARCHAR(20) NOT NULL,
  fortune_date  DATE NOT NULL,
  fortune_type  VARCHAR(10) DEFAULT 'daily',  -- daily/weekly/monthly/yearly
  scores        JSONB NOT NULL,  -- 六维评分
  texts         JSONB NOT NULL,  -- 运势文本
  ai_persona    VARCHAR(20),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, fortune_date, fortune_type)
);

CREATE INDEX idx_fortunes_user_date ON fortunes(user_id, fortune_date DESC);
```

#### 订阅表 (subscriptions)
```sql
CREATE TABLE subscriptions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type     VARCHAR(20) NOT NULL,  -- monthly/yearly/single
  status        VARCHAR(20) DEFAULT 'active',  -- active/expired/cancelled
  start_date    TIMESTAMPTZ NOT NULL,
  end_date      TIMESTAMPTZ NOT NULL,
  payment_id    VARCHAR(100),  -- 第三方支付单号
  payment_amount DECIMAL(10, 2),
  payment_method VARCHAR(20),  -- wechat/alipay
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id, status);
```

#### 订单表 (orders)
```sql
CREATE TABLE orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  order_type    VARCHAR(20) NOT NULL,  -- subscription/product/reading
  product_id    VARCHAR(50),
  product_name  VARCHAR(200),
  amount        DECIMAL(10, 2) NOT NULL,
  status        VARCHAR(20) DEFAULT 'pending',  -- pending/paid/refunded
  payment_id    VARCHAR(100),
  payment_method VARCHAR(20),
  paid_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);
```

#### AI 缓存表 (ai_cache)
```sql
CREATE TABLE ai_cache (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key     VARCHAR(255) UNIQUE NOT NULL,  -- 输入的哈希
  cache_type    VARCHAR(50) NOT NULL,  -- tarot/natal/transit...
  input_hash    VARCHAR(64) NOT NULL,  -- SHA-256
  response      TEXT NOT NULL,
  model         VARCHAR(50),
  tokens_used   INTEGER,
  expires_at    TIMESTAMPTZ,
  hit_count     INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_cache_key ON ai_cache(cache_key);
CREATE INDEX idx_ai_cache_expires ON ai_cache(expires_at);
```

### 3.3 数据库迁移策略

```bash
# 初始化
npx prisma migrate dev --name init

# 后续迁移
npx prisma migrate dev --name add_community_tables

# 生产部署
npx prisma migrate deploy
```

---

## 四、API 设计

### 4.1 API 规范

- **风格**：RESTful
- **版本**：URL 路径版本化 (`/api/v1/...`)
- **认证**：JWT Bearer Token
- **限流**：令牌桶算法
- **响应格式**：

```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

### 4.2 核心 API 清单

#### 认证模块
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/auth/sms/send` | 发送验证码 |
| POST | `/api/v1/auth/sms/login` | 手机号登录 |
| POST | `/api/v1/auth/wechat` | 微信登录 |
| POST | `/api/v1/auth/refresh` | 刷新 Token |
| POST | `/api/v1/auth/logout` | 退出登录 |

#### 用户模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/user/profile` | 获取个人信息 |
| PUT | `/api/v1/user/profile` | 更新个人信息 |
| PUT | `/api/v1/user/birth` | 更新出生信息 |
| GET | `/api/v1/user/settings` | 获取设置 |
| PUT | `/api/v1/user/settings` | 更新设置 |

#### 星盘模块
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/chart/natal` | 创建本命盘 |
| POST | `/api/v1/chart/synastry` | 创建合盘 |
| GET | `/api/v1/chart/:id` | 获取星盘详情 |
| GET | `/api/v1/chart/list` | 获取星盘列表 |
| DELETE | `/api/v1/chart/:id` | 删除星盘 |
| POST | `/api/v1/chart/:id/reading` | 获取 AI 解读 |
| GET | `/api/v1/chart/transit` | 获取行运盘 |
| GET | `/api/v1/chart/sky` | 获取天象盘 |

#### 占卜模块
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/divination/tarot` | 塔罗占卜 |
| POST | `/api/v1/divination/lenormand` | 雷诺曼占卜 |
| POST | `/api/v1/divination/bazi` | 八字排盘 |
| POST | `/api/v1/divination/numerology` | 数字命理 |
| GET | `/api/v1/divination/history` | 占卜历史 |
| GET | `/api/v1/divination/:id` | 获取占卜详情 |

#### 运势模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/fortune/daily` | 每日运势 |
| GET | `/api/v1/fortune/weekly` | 每周运势 |
| GET | `/api/v1/fortune/monthly` | 每月运势 |
| GET | `/api/v1/fortune/calendar` | 运势日历 |
| GET | `/api/v1/fortune/history` | 运势历史 |

#### 商城模块
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/shop/products` | 商品列表 |
| GET | `/api/v1/shop/product/:id` | 商品详情 |
| POST | `/api/v1/shop/order` | 创建订单 |
| GET | `/api/v1/shop/orders` | 订单列表 |
| POST | `/api/v1/shop/payment` | 发起支付 |

#### 社区模块（Phase 4）
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/community/feed` | 动态流 |
| POST | `/api/v1/community/post` | 发布动态 |
| POST | `/api/v1/community/post/:id/like` | 点赞 |
| POST | `/api/v1/community/post/:id/comment` | 评论 |
| GET | `/api/v1/community/match` | 星座匹配 |

### 4.3 限流策略

```typescript
// 限流配置
const RATE_LIMITS = {
  // 免费用户
  free: {
    tarot: { limit: 3, window: '1d' },      // 每天3次塔罗
    fortune: { limit: 1, window: '1d' },    // 每天1次运势
    chart: { limit: 5, window: '7d' },      // 每周5次星盘
    aiReading: { limit: 3, window: '1d' },  // 每天3次AI解读
  },
  // Pro 用户
  premium: {
    tarot: { limit: -1, window: '1d' },     // 无限
    fortune: { limit: -1, window: '1d' },   // 无限
    chart: { limit: -1, window: '7d' },     // 无限
    aiReading: { limit: -1, window: '1d' }, // 无限
  },
  // 全局
  global: {
    api: { limit: 100, window: '1m' },      // 每分钟100次请求
  }
};
```

---

## 五、服务层设计

### 5.1 模块划分

```
src/
├── modules/
│   ├── auth/              # 认证模块
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   │
│   ├── user/              # 用户模块
│   │   ├── user.module.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── dto/
│   │
│   ├── chart/             # 星盘模块
│   │   ├── chart.module.ts
│   │   ├── chart.controller.ts
│   │   ├── chart.service.ts
│   │   ├── astrology.engine.ts    # 占星计算引擎
│   │   ├── house.systems.ts       # 宫位系统
│   │   ├── aspect.calculator.ts   # 相位计算器
│   │   └── dto/
│   │
│   ├── divination/        # 占卜模块
│   │   ├── divination.module.ts
│   │   ├── divination.controller.ts
│   │   ├── divination.service.ts
│   │   ├── tarot.service.ts       # 塔罗牌逻辑
│   │   ├── lenormand.service.ts   # 雷诺曼逻辑
│   │   ├── bazi.service.ts        # 八字逻辑
│   │   └── dto/
│   │
│   ├── fortune/           # 运势模块
│   │   ├── fortune.module.ts
│   │   ├── fortune.controller.ts
│   │   ├── fortune.service.ts
│   │   └── dto/
│   │
│   ├── ai/                # AI 服务模块
│   │   ├── ai.module.ts
│   │   ├── ai.service.ts
│   │   ├── ai.proxy.ts           # 多模型代理
│   │   ├── ai.cache.ts           # 缓存策略
│   │   ├── ai.limiter.ts         # 限流控制
│   │   ├── prompts/              # Prompt 模板
│   │   │   ├── tarot.prompt.ts
│   │   │   ├── natal.prompt.ts
│   │   │   ├── synastry.prompt.ts
│   │   │   └── fortune.prompt.ts
│   │   └── personas/             # AI 人设
│   │       ├── neon.persona.ts
│   │       ├── forest.persona.ts
│   │       └── dragon.persona.ts
│   │
│   ├── shop/              # 商城模块
│   │   ├── shop.module.ts
│   │   ├── shop.controller.ts
│   │   ├── shop.service.ts
│   │   ├── payment.service.ts    # 支付服务
│   │   └── dto/
│   │
│   └── common/            # 公共模块
│       ├── common.module.ts
│       ├── interceptors/         # 拦截器
│       ├── guards/               # 守卫
│       ├── filters/              # 过滤器
│       └── pipes/                # 管道
│
├── prisma/                # 数据库
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
└── config/                # 配置
    ├── database.config.ts
    ├── redis.config.ts
    ├── ai.config.ts
    └── app.config.ts
```

### 5.2 核心服务实现示例

#### AI 代理服务
```typescript
// ai.proxy.ts
interface AIProvider {
  name: string;
  chat(messages: ChatMessage[], options: ChatOptions): Promise<ChatResponse>;
}

class AIProxyService {
  private providers: Map<string, AIProvider> = new Map();
  private fallbackOrder = ['deepseek', 'qwen', 'moonshot'];

  constructor() {
    this.providers.set('deepseek', new DeepSeekProvider());
    this.providers.set('qwen', new QwenProvider());
    this.providers.set('moonshot', new MoonshotProvider());
  }

  async chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): Promise<ChatResponse> {
    for (const providerName of this.fallbackOrder) {
      const provider = this.providers.get(providerName);
      try {
        return await provider.chat(messages, options);
      } catch (error) {
        console.warn(`${providerName} failed, trying next...`);
        continue;
      }
    }
    throw new Error('All AI providers failed');
  }
}
```

#### 占星计算引擎
```typescript
// astrology.engine.ts
class AstrologyEngine {
  // 计算本命盘
  calculateNatal(params: {
    birthDate: Date;
    birthTime: Date;
    lat: number;
    lng: number;
    houseSystem?: HouseSystem;
  }): NatalChart {
    const time = Astronomy.MakeTime(params.birthDate);
    
    // 1. 计算行星位置
    const planets = this.calculatePlanets(time);
    
    // 2. 计算宫位
    const houses = this.calculateHouses(time, params, params.houseSystem);
    
    // 3. 计算相位
    const aspects = this.calculateAspects(planets);
    
    return { planets, houses, aspects };
  }

  // 计算行运盘
  calculateTransit(natal: NatalChart, transitDate: Date): TransitResult {
    const currentPlanets = this.calculatePlanets(Astronomy.MakeTime(transitDate));
    const transits = this.findTransitAspects(natal.planets, currentPlanets);
    return { currentPlanets, transits };
  }

  // 计算合盘
  calculateSynastry(chartA: NatalChart, chartB: NatalChart): SynastryResult {
    const synastryAspects = this.findSynastryAspects(chartA.planets, chartB.planets);
    const attractionIndex = this.calculateAttraction(synastryAspects);
    return { aspects: synastryAspects, attractionIndex };
  }
}
```

---

## 六、前端架构

### 6.1 目录结构（重构后）

```
src/
├── app/                    # 应用入口
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx          # 路由配置
│   └── providers.tsx       # 全局 Provider
│
├── features/               # 功能模块（按领域划分）
│   ├── auth/               # 认证
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── store.ts
│   │
│   ├── chart/              # 星盘
│   │   ├── components/
│   │   │   ├── AstrologyWheel.tsx
│   │   │   ├── PlanetInfo.tsx
│   │   │   ├── HouseInfo.tsx
│   │   │   └── AspectInfo.tsx
│   │   ├── hooks/
│   │   │   ├── useNatalChart.ts
│   │   │   ├── useTransit.ts
│   │   │   └── useSynastry.ts
│   │   ├── api.ts
│   │   ├── store.ts
│   │   └── types.ts
│   │
│   ├── divination/         # 占卜
│   │   ├── components/
│   │   │   ├── TarotDeck.tsx
│   │   │   ├── CardSpread.tsx
│   │   │   ├── LenormandDeck.tsx
│   │   │   └── BaziChart.tsx
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── store.ts
│   │
│   ├── fortune/            # 运势
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── store.ts
│   │
│   ├── shop/               # 商城
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   └── store.ts
│   │
│   └── profile/            # 个人中心
│       ├── components/
│       ├── hooks/
│       ├── api.ts
│       └── store.ts
│
├── shared/                 # 共享组件
│   ├── ui/                 # UI 基础组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── Loading.tsx
│   ├── layout/             # 布局组件
│   │   ├── MainLayout.tsx
│   │   ├── BottomNav.tsx
│   │   └── Header.tsx
│   └── effects/            # 特效组件
│       ├── Scanlines.tsx
│       ├── Vignette.tsx
│       ├── Stars.tsx
│       └── NeonGlow.tsx
│
├── lib/                    # 工具函数
│   ├── api.ts              # Axios 实例
│   ├── auth.ts             # 认证工具
│   ├── date.ts             # 日期工具
│   ├── audio.ts            # 音效
│   └── haptics.ts          # 震动反馈
│
├── hooks/                  # 全局 Hooks
│   ├── useAuth.ts
│   ├── usePremium.ts
│   └── useRateLimit.ts
│
├── stores/                 # 全局 Store
│   ├── auth.store.ts
│   └── app.store.ts
│
└── types/                  # 全局类型
    ├── api.ts
    ├── user.ts
    └── astrology.ts
```

### 6.2 状态管理设计

```typescript
// features/chart/store.ts
interface ChartState {
  // 当前星盘
  currentChart: NatalChart | null;
  chartList: ChartSummary[];
  
  // 行运
  transitChart: TransitResult | null;
  transitDate: Date;
  
  // 合盘
  partnerChart: NatalChart | null;
  synastryResult: SynastryResult | null;
  
  // UI 状态
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createNatal: (params: CreateNatalParams) => Promise<void>;
  loadChart: (chartId: string) => Promise<void>;
  calculateTransit: (date: Date) => Promise<void>;
  calculateSynastry: (partnerBirth: PartnerBirth) => Promise<void>;
}
```

### 6.3 API 请求层

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

// 请求拦截 - 添加 Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截 - 处理错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期，跳转登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 七、安全设计

### 7.1 认证流程

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  客户端  │────▶│  短信网关│────▶│  手机号  │
└────┬────┘     └─────────┘     └─────────┘
     │ 验证码
     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│  验证码  │────▶│  后端    │────▶│  Redis  │
└────┬────┘     └────┬────┘     └─────────┘
     │               │
     │  JWT Token    │
     ▼               ▼
┌─────────────────────────────┐
│  返回 Access Token + Refresh Token
│  Access Token: 15min
│  Refresh Token: 7d
└─────────────────────────────┘
```

### 7.2 安全措施

| 层级 | 措施 | 说明 |
|------|------|------|
| 传输层 | HTTPS + TLS 1.3 | 全站加密 |
| 认证层 | JWT + Refresh Token | 无状态认证 |
| 授权层 | RBAC | 角色权限控制 |
| 数据层 | 字段加密 | 敏感信息加密存储 |
| API 层 | 限流 + 防刷 | 令牌桶 + 验证码 |
| 输入层 | 参数校验 | 防注入、防 XSS |
| 日志层 | 审计日志 | 关键操作记录 |

### 7.3 API Key 保护

```typescript
// 后端 AI 代理
// 环境变量（仅后端可见）
DEEPSEEK_API_KEY=sk-xxx
QWEN_API_KEY=sk-xxx

// 前端只能调用后端 API
// /api/v1/ai/chat -> 后端转发到 DeepSeek
```

---

## 八、性能优化

### 8.1 缓存策略

| 数据类型 | 缓存位置 | 过期时间 | 说明 |
|----------|----------|----------|------|
| 用户信息 | Redis | 30min | 频繁读取 |
| 星盘计算 | Redis | 7d | 计算成本高 |
| AI 解读 | Redis | 30d | API 成本高 |
| 每日运势 | Redis | 24h | 每日更新 |
| 天象数据 | Redis | 1h | 实时性要求 |
| 静态资源 | CDN | 7d | 图片、字体 |

### 8.2 前端优化

```typescript
// 1. 路由懒加载
const StarChart = lazy(() => import('./features/chart/pages/StarChart'));
const Divination = lazy(() => import('./features/divination/pages/Divination'));

// 2. 图片懒加载
<img loading="lazy" src={imageUrl} alt="..." />

// 3. 虚拟列表（占卜历史）
import { useVirtualizer } from '@tanstack/react-virtual';

// 4. 本地计算占星（减少 API 调用）
// 当前已有 astronomy-engine，可直接在前端计算
```

### 8.3 后端优化

```typescript
// 1. 数据库连接池
prisma.$connect();

// 2. 批量查询
const charts = await prisma.chart.findMany({
  where: { userId },
  take: 20,
  skip: (page - 1) * 20,
});

// 3. 异步任务（AI 解读）
// 使用 Bull 队列处理耗时的 AI 请求
await aiQueue.add('natal-reading', { chartId });
```

---

## 九、DevOps

### 9.1 Docker 配置

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### 9.2 CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/pixeldivination
            git pull
            docker-compose up -d --build
```

### 9.3 监控告警

| 监控项 | 工具 | 告警阈值 |
|--------|------|----------|
| API 响应时间 | Prometheus | P99 > 2s |
| 错误率 | Sentry | > 1% |
| AI 调用成本 | 自建 | 日预算 > ¥500 |
| 服务器负载 | Grafana | CPU > 80% |
| 数据库连接 | Prisma | 连接池 > 80% |

---

## 十、实施方案

### 10.1 里程碑计划

```
Phase 1: 基础建设 (Week 1-4)
├── Week 1: 后端项目初始化 + 数据库设计
├── Week 2: 用户认证系统
├── Week 3: AI 代理层 + 限流
└── Week 4: 前后端联调 + 部署

Phase 2: 功能扩展 (Week 5-10)
├── Week 5-6: 塔罗牌全功能
├── Week 7: 雷诺曼完整功能
├── Week 8: 八字命理系统
├── Week 9: 数字命理
└── Week 10: 付费功能

Phase 3: 商业化 (Week 11-16)
├── Week 11-12: 会员订阅系统
├── Week 13-14: 紫微斗数 + 六爻
├── Week 15: 商城功能
└── Week 16: 整体测试 + 优化

Phase 4: 社交增长 (Week 17-24)
├── Week 17-18: 星座匹配
├── Week 19-20: 社区功能
├── Week 21-22: 小程序
└── Week 23-24: 增长功能
```

### 10.2 技术债务清单

| 问题 | 优先级 | 预估工时 | 负责人 |
|------|--------|----------|--------|
| API Key 暴露前端 | P0 | 5天 | 后端 |
| localStorage 数据迁移 | P0 | 3天 | 全栈 |
| 塔罗牌 PNG→WebP | P0 | 已完成 | - |
| Tailwind v4 迁移 | P0 | 已完成 | - |
| 八字算法研究 | P1 | 5天 | 后端 |
| 紫微斗数算法 | P2 | 10天 | 后端 |

### 10.3 人员需求

| 角色 | 人数 | 职责 |
|------|------|------|
| 全栈工程师 | 2 | 前后端开发 |
| 后端工程师 | 1 | API、数据库、AI |
| 前端工程师 | 1 | UI、动画、交互 |
| UI/UX 设计 | 1 | 界面设计 |
| 产品经理 | 0.5 | 需求管理 |

### 10.4 预算估算

| 项目 | 月成本 | 说明 |
|------|--------|------|
| 服务器 | ¥500 | 2核4G云服务器 |
| 数据库 | ¥200 | PostgreSQL 托管 |
| AI API | ¥1000-3000 | 按用量计费 |
| 短信服务 | ¥100 | 验证码 |
| CDN | ¥50 | 静态资源 |
| 域名+SSL | ¥50 | 年费分摊 |
| **合计** | **¥1900-3900/月** | |

---

## 十一、附录

### 11.1 开发规范

- **Git Flow**: main -> develop -> feature/xxx
- **Commit**: `feat: xxx` / `fix: xxx` / `chore: xxx`
- **PR**: 必须 Code Review + CI 通过
- **测试**: 单元测试覆盖率 > 60%

### 11.2 环境配置

```bash
# .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/pixeldivination
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
DEEPSEEK_API_KEY=sk-xxx
```

### 11.3 相关文档
- `docs/PRODUCT_PLAN.md` — 产品规划文档
- `STYLE_GUIDE.md` — 代码风格指南
- `README.md` — 项目说明

---

*本文档由 MiMoCode 生成，可随时更新*
