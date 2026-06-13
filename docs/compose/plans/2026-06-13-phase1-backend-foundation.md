# Phase 1: Backend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the backend foundation with API proxy, database, and authentication to resolve the critical security issue of exposed API keys.

**Architecture:** NestJS backend with PostgreSQL database, Prisma ORM, JWT authentication, and AI proxy layer. The backend will handle all AI API calls, hiding the API keys from the frontend.

**Tech Stack:** NestJS, PostgreSQL, Prisma, Redis, JWT, DeepSeek API

---

## File Structure

```
server/
├── src/
│   ├── main.ts                    # 应用入口
│   ├── app.module.ts              # 根模块
│   ├── config/                    # 配置
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── app.config.ts
│   ├── modules/
│   │   ├── auth/                  # 认证模块
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt.guard.ts
│   │   │   └── dto/
│   │   │       └── auth.dto.ts
│   │   ├── user/                  # 用户模块
│   │   │   ├── user.module.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── dto/
│   │   │       └── user.dto.ts
│   │   ├── ai/                    # AI 代理模块
│   │   │   ├── ai.module.ts
│   │   │   ├── ai.controller.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── ai.proxy.ts
│   │   │   ├── ai.cache.ts
│   │   │   ├── ai.limiter.ts
│   │   │   └── dto/
│   │   │       └── ai.dto.ts
│   │   ├── chart/                 # 星盘模块
│   │   │   ├── chart.module.ts
│   │   │   ├── chart.controller.ts
│   │   │   ├── chart.service.ts
│   │   │   └── dto/
│   │   │       └── chart.dto.ts
│   │   └── common/                # 公共模块
│   │       ├── common.module.ts
│   │       ├── interceptors/
│   │       │   └── transform.interceptor.ts
│   │       ├── filters/
│   │       │   └── http-exception.filter.ts
│   │       └── guards/
│   │           └── throttle.guard.ts
│   └── prisma/                    # Prisma
│       ├── prisma.module.ts
│       ├── prisma.service.ts
│       └── schema.prisma
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── .env.example
```

---

## Task 1: Initialize NestJS Backend Project

**Covers:** S1 (Architecture)

**Files:**
- Create: `server/` directory
- Create: `server/package.json`
- Create: `server/tsconfig.json`
- Create: `server/nest-cli.json`

- [ ] **Step 1: Create server directory and initialize NestJS project**

```bash
cd /Users/Sean/Documents/pixeldivination
mkdir server
cd server
npm init -y
```

- [ ] **Step 2: Install NestJS dependencies**

```bash
npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs
npm install -D @nestjs/cli @nestjs/schematics typescript @types/node ts-node
```

- [ ] **Step 3: Create package.json scripts**

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main"
  }
}
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

- [ ] **Step 5: Create nest-cli.json**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

- [ ] **Step 6: Create main.ts entry point**

```typescript
// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
```

- [ ] **Step 7: Create app.module.ts**

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- [ ] **Step 8: Test server starts**

```bash
npm run start:dev
```

Expected: Server starts on port 3000

- [ ] **Step 9: Commit**

```bash
git add server/
git commit -m "feat: initialize NestJS backend project"
```

---

## Task 2: Set Up Prisma and Database Schema

**Covers:** S3 (Database Design)

**Files:**
- Create: `server/src/prisma/schema.prisma`
- Create: `server/src/prisma/prisma.module.ts`
- Create: `server/src/prisma/prisma.service.ts`
- Create: `server/.env.example`

- [ ] **Step 1: Install Prisma dependencies**

```bash
cd /Users/Sean/Documents/pixeldivination/server
npm install prisma @prisma/client
npx prisma init
```

- [ ] **Step 2: Create database schema**

```prisma
// server/src/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  phone         String?   @unique
  email         String?   @unique
  nickname      String
  avatarUrl     String?   @map("avatar_url")
  gender        String?
  birthDate     DateTime? @map("birth_date")
  birthTime     String?   @map("birth_time")
  birthCity     String?   @map("birth_city")
  birthLat      Decimal?  @map("birth_lat")
  birthLng      Decimal?  @map("birth_lng")
  zodiacSign    String?   @map("zodiac_sign")
  kuaNumber     Int?      @map("kua_number")
  timezone      String    @default("Asia/Shanghai")
  isPremium     Boolean   @default(false) @map("is_premium")
  premiumUntil  DateTime? @map("premium_until")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  charts        Chart[]
  divinations   Divination[]
  fortunes      Fortune[]
  subscriptions Subscription[]
  orders        Order[]

  @@map("users")
}

model Chart {
  id                String    @id @default(uuid())
  userId            String    @map("user_id")
  name              String?
  chartType         String    @map("chart_type")
  birthDate         DateTime  @map("birth_date")
  birthTime         String?   @map("birth_time")
  birthCity         String?   @map("birth_city")
  birthLat          Decimal?  @map("birth_lat")
  birthLng          Decimal?  @map("birth_lng")
  partnerBirthDate  DateTime? @map("partner_birth_date")
  partnerBirthTime  String?   @map("partner_birth_time")
  partnerBirthCity  String?   @map("partner_birth_city")
  planets           Json      @map("planets")
  houses            Json      @map("houses")
  aspects           Json      @map("aspects")
  ascendant         Decimal?  @map("ascendant")
  midheaven         Decimal?  @map("midheaven")
  aiReading         String?   @map("ai_reading")
  aiReadingAt       DateTime? @map("ai_reading_at")
  isPublic          Boolean   @default(false) @map("is_public")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([chartType])
  @@map("charts")
}

model Divination {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  divType     String   @map("div_type")
  deckType    String?  @map("deck_type")
  spreadType  String?  @map("spread_type")
  cards       Json?
  baziData    Json?    @map("bazi_data")
  question    String?
  aiReading   String?  @map("ai_reading")
  aiPersona   String?  @map("ai_persona")
  isFree      Boolean  @default(true) @map("is_free")
  createdAt   DateTime @default(now()) @map("created_at")

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([divType])
  @@index([createdAt])
  @@map("divinations")
}

model Fortune {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  zodiacSign  String   @map("zodiac_sign")
  fortuneDate DateTime @map("fortune_date")
  fortuneType String   @default("daily") @map("fortune_type")
  scores      Json     @map("scores")
  texts       Json     @map("texts")
  aiPersona   String?  @map("ai_persona")
  createdAt   DateTime @default(now()) @map("created_at")

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, fortuneDate, fortuneType])
  @@index([userId, fortuneDate])
  @@map("fortunes")
}

model Subscription {
  id             String   @id @default(uuid())
  userId         String   @map("user_id")
  planType       String   @map("plan_type")
  status         String   @default("active")
  startDate      DateTime @map("start_date")
  endDate        DateTime @map("end_date")
  paymentId      String?  @map("payment_id")
  paymentAmount  Decimal? @map("payment_amount")
  paymentMethod  String?  @map("payment_method")
  createdAt      DateTime @default(now()) @map("created_at")

  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, status])
  @@map("subscriptions")
}

model Order {
  id            String    @id @default(uuid())
  userId        String    @map("user_id")
  orderType     String    @map("order_type")
  productId     String?   @map("product_id")
  productName   String?   @map("product_name")
  amount        Decimal   @map("amount")
  status        String    @default("pending")
  paymentId     String?   @map("payment_id")
  paymentMethod String?   @map("payment_method")
  paidAt        DateTime? @map("paid_at")
  createdAt     DateTime  @default(now()) @map("created_at")

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@map("orders")
}
```

- [ ] **Step 3: Create Prisma service**

```typescript
// server/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

- [ ] **Step 4: Create Prisma module**

```typescript
// server/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

- [ ] **Step 5: Update app.module.ts to include Prisma**

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- [ ] **Step 6: Create .env.example**

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pixeldivination?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"

# AI
DEEPSEEK_API_KEY="sk-xxx"
QWEN_API_KEY="sk-xxx"
MOONSHOT_API_KEY="sk-xxx"
```

- [ ] **Step 7: Run migration**

```bash
npx prisma migrate dev --name init
```

- [ ] **Step 8: Generate Prisma client**

```bash
npx prisma generate
```

- [ ] **Step 9: Commit**

```bash
git add server/
git commit -m "feat: add Prisma schema and database setup"
```

---

## Task 3: Create AI Proxy Service

**Covers:** S4 (AI Proxy)

**Files:**
- Create: `server/src/modules/ai/ai.module.ts`
- Create: `server/src/modules/ai/ai.service.ts`
- Create: `server/src/modules/ai/ai.controller.ts`
- Create: `server/src/modules/ai/dto/ai.dto.ts`

- [ ] **Step 1: Install AI dependencies**

```bash
cd /Users/Sean/Documents/pixeldivination/server
npm install openai ioredis
npm install -D @types/ioredis
```

- [ ] **Step 2: Create AI DTOs**

```typescript
// server/src/modules/ai/dto/ai.dto.ts
export class ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class ChatCompletionDto {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  persona?: string;
}

export class TarotReadingDto {
  question: string;
  cards: string[];
  persona?: string;
}

export class NatalReadingDto {
  chartData: {
    planets: any[];
    houses: any[];
    aspects: any[];
  };
  persona?: string;
}

export class SynastryReadingDto {
  chartA: any[];
  chartB: any[];
  partnerName: string;
  persona?: string;
}
```

- [ ] **Step 3: Create AI service**

```typescript
// server/src/modules/ai/ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionDto,
  TarotReadingDto,
  NatalReadingDto,
  SynastryReadingDto,
} from './dto/ai.dto';

const PERSONAS = {
  neon: {
    name: '霓虹先知',
    prompt: '你是"霓虹先知"，一位赛博朋克风格的AI占卜师。你说话神秘、直觉敏锐，偶尔带点警告或鼓励。使用科技感的比喻，像一个活在数据流中的先知。',
  },
  forest: {
    name: '森林低语者',
    prompt: '你是"森林低语者"，一位温柔治愈的AI占卜师。你说话温柔、充满自然意象，像林间的精灵。用花草树木、四季轮转来比喻人生。',
  },
  dragon: {
    name: '龙焰审判者',
    prompt: '你是"龙焰审判者"，一位犀利直接的AI占卜师。你说话一针见血、不留情面，但内心深处关心用户。像一位严厉但智慧的导师。',
  },
};

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor(private config: ConfigService) {
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: this.config.get('DEEPSEEK_API_KEY') || 'dummy-key',
    });
  }

  async chat(dto: ChatCompletionDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: persona.prompt },
          ...dto.messages,
        ],
        model: dto.model || 'deepseek-chat',
        temperature: dto.temperature || 1.1,
        max_tokens: dto.maxTokens || 2000,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      this.logger.error('AI chat failed:', error);
      throw new Error('AI service unavailable');
    }
  }

  async tarotReading(dto: TarotReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const systemPrompt = `
${persona.prompt}
请根据用户的问题和抽出的牌面，进行深度解读。
包含：【核心洞察】、【现状分析】、【未来指引】三个部分。
使用 Markdown 格式。
`;
    const userPrompt = `问题：${dto.question}。牌面：${dto.cards.join(', ')}。`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model: 'deepseek-chat',
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error('Tarot reading failed:', error);
      throw new Error('AI service unavailable');
    }
  }

  async natalReading(dto: NatalReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const systemPrompt = `
${persona.prompt}
请根据用户的星盘数据（行星落座与宫位），生成一份简练深刻的本命盘报告。
包含三个部分：【核心人格】、【情感模式】、【天赋潜能】。
使用 Markdown 格式。
`;
    const userPrompt = `我的星盘数据：${JSON.stringify(dto.chartData)}。请解读我的本命盘。`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model: 'deepseek-chat',
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error('Natal reading failed:', error);
      throw new Error('AI service unavailable');
    }
  }

  async synastryReading(dto: SynastryReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const systemPrompt = `
${persona.prompt}
你是一位精通比较盘（Synastry）的占星师。
请分析这两个星盘的关系（合盘）。
A的行星：${JSON.stringify(dto.chartA)}
B的行星（伴侣/对方）：${JSON.stringify(dto.chartB)}
请从【吸引力】、【冲突点】、【相处建议】三个维度生成一份Markdown报告。
语气要求：浪漫且客观，符合你的人设。
`;
    const userPrompt = `请分析我与 ${dto.partnerName} 的合盘。`;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model: 'deepseek-chat',
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error('Synastry reading failed:', error);
      throw new Error('AI service unavailable');
    }
  }
}
```

- [ ] **Step 4: Create AI controller**

```typescript
// server/src/modules/ai/ai.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import {
  ChatCompletionDto,
  TarotReadingDto,
  NatalReadingDto,
  SynastryReadingDto,
} from './dto/ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() dto: ChatCompletionDto) {
    const result = await this.aiService.chat(dto);
    return { data: result };
  }

  @Post('tarot')
  async tarotReading(@Body() dto: TarotReadingDto) {
    const result = await this.aiService.tarotReading(dto);
    return { data: result };
  }

  @Post('natal')
  async natalReading(@Body() dto: NatalReadingDto) {
    const result = await this.aiService.natalReading(dto);
    return { data: result };
  }

  @Post('synastry')
  async synastryReading(@Body() dto: SynastryReadingDto) {
    const result = await this.aiService.synastryReading(dto);
    return { data: result };
  }
}
```

- [ ] **Step 5: Create AI module**

```typescript
// server/src/modules/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
```

- [ ] **Step 6: Update app.module.ts**

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- [ ] **Step 7: Test AI endpoint**

```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "你好"}], "persona": "neon"}'
```

- [ ] **Step 8: Commit**

```bash
git add server/
git commit -m "feat: add AI proxy service with multi-persona support"
```

---

## Task 4: Create JWT Authentication System

**Covers:** S5 (Authentication)

**Files:**
- Create: `server/src/modules/auth/auth.module.ts`
- Create: `server/src/modules/auth/auth.service.ts`
- Create: `server/src/modules/auth/auth.controller.ts`
- Create: `server/src/modules/auth/jwt.strategy.ts`
- Create: `server/src/modules/auth/jwt.guard.ts`
- Create: `server/src/modules/auth/dto/auth.dto.ts`
- Create: `server/src/modules/user/user.module.ts`
- Create: `server/src/modules/user/user.service.ts`

- [ ] **Step 1: Install auth dependencies**

```bash
cd /Users/Sean/Documents/pixeldivination/server
npm install @nestjs/jwt @nestjs/passport passport passport-jwt class-validator class-transformer
npm install -D @types/passport-jwt
```

- [ ] **Step 2: Create auth DTOs**

```typescript
// server/src/modules/auth/dto/auth.dto.ts
import { IsString, IsOptional, IsEmail, IsDateString, MinLength } from 'class-validator';

export class SendSmsDto {
  @IsString()
  phone: string;
}

export class SmsLoginDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}

export class WechatLoginDto {
  @IsString()
  code: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  birthTime?: string;

  @IsOptional()
  @IsString()
  birthCity?: string;

  @IsOptional()
  birthLat?: number;

  @IsOptional()
  birthLng?: number;
}
```

- [ ] **Step 3: Create JWT strategy**

```typescript
// server/src/modules/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') || 'default-secret',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, phone: payload.phone };
  }
}
```

- [ ] **Step 4: Create JWT guard**

```typescript
// server/src/modules/auth/jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

- [ ] **Step 5: Create user service**

```typescript
// server/src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { phone?: string; nickname: string }) {
    return this.prisma.user.create({ data });
  }

  async update(id: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }
}
```

- [ ] **Step 6: Create auth service**

```typescript
// server/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async sendSmsCode(phone: string): Promise<{ message: string }> {
    // TODO: Integrate SMS service (Aliyun, Tencent)
    // For demo, use fixed code
    console.log(`SMS sent to ${phone}, code: 123456`);
    return { message: '验证码已发送' };
  }

  async smsLogin(phone: string, code: string) {
    // TODO: Verify SMS code from Redis
    if (code !== '123456') {
      throw new UnauthorizedException('验证码错误');
    }

    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create({
        phone,
        nickname: `用户${phone.slice(-4)}`,
      });
    }

    return this.generateTokens(user.id, phone);
  }

  async wechatLogin(code: string) {
    // TODO: Integrate WeChat OAuth
    throw new UnauthorizedException('微信登录暂未开放');
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET') || 'refresh-secret',
      });
      return this.generateTokens(payload.sub, payload.phone);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(userId: string, phone: string) {
    const payload = { sub: userId, phone };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_EXPIRES_IN') || '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET') || 'refresh-secret',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: { id: userId, phone },
    };
  }
}
```

- [ ] **Step 7: Create auth controller**

```typescript
// server/src/modules/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendSmsDto, SmsLoginDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('sms/send')
  async sendSms(@Body() dto: SendSmsDto) {
    return this.authService.sendSmsCode(dto.phone);
  }

  @Post('sms/login')
  async smsLogin(@Body() dto: SmsLoginDto) {
    return this.authService.smsLogin(dto.phone, dto.code);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }
}
```

- [ ] **Step 8: Create user module**

```typescript
// server/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

- [ ] **Step 9: Create auth module**

```typescript
// server/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || 'default-secret',
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') || '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

- [ ] **Step 10: Update app.module.ts**

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- [ ] **Step 11: Test auth endpoints**

```bash
# Send SMS
curl -X POST http://localhost:3000/api/auth/sms/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000"}'

# Login
curl -X POST http://localhost:3000/api/auth/sms/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "code": "123456"}'

# Get profile (with token)
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

- [ ] **Step 12: Commit**

```bash
git add server/
git commit -m "feat: add JWT authentication system"
```

---

## Task 5: Create Chart Module (Star Chart)

**Covers:** S6 (Star Chart)

**Files:**
- Create: `server/src/modules/chart/chart.module.ts`
- Create: `server/src/modules/chart/chart.service.ts`
- Create: `server/src/modules/chart/chart.controller.ts`
- Create: `server/src/modules/chart/dto/chart.dto.ts`
- Create: `server/src/modules/chart/astrology.engine.ts`

- [ ] **Step 1: Install astrology engine**

```bash
cd /Users/Sean/Documents/pixeldivination/server
npm install astronomy-engine
```

- [ ] **Step 2: Create chart DTOs**

```typescript
// server/src/modules/chart/dto/chart.dto.ts
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateNatalDto {
  @IsDateString()
  birthDate: string;

  @IsString()
  birthTime: string;

  @IsString()
  birthCity: string;

  @IsNumber()
  birthLat: number;

  @IsNumber()
  birthLng: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  houseSystem?: string;
}

export class CreateSynastryDto {
  // Person A (self)
  @IsDateString()
  birthDateA: string;

  @IsString()
  birthTimeA: string;

  @IsString()
  birthCityA: string;

  @IsNumber()
  birthLatA: number;

  @IsNumber()
  birthLngA: number;

  // Person B (partner)
  @IsDateString()
  birthDateB: string;

  @IsString()
  birthTimeB: string;

  @IsString()
  birthCityB: string;

  @IsNumber()
  birthLatB: number;

  @IsNumber()
  birthLngB: number;

  @IsOptional()
  @IsString()
  partnerName?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
```

- [ ] **Step 3: Create astrology engine**

```typescript
// server/src/modules/chart/astrology.engine.ts
import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
  name: string;
  symbol: string;
  longitude: number;
}

export interface HouseCusp {
  id: number;
  angle: number;
}

export interface AstrologyData {
  planets: PlanetPosition[];
  houses: HouseCusp[];
  ascendant: number;
  midheaven: number;
}

const BODIES = [
  { name: '太阳', symbol: '☉', body: Astronomy.Body.Sun },
  { name: '月亮', symbol: '☽', body: Astronomy.Body.Moon },
  { name: '水星', symbol: '☿', body: Astronomy.Body.Mercury },
  { name: '金星', symbol: '♀', body: Astronomy.Body.Venus },
  { name: '火星', symbol: '♂', body: Astronomy.Body.Mars },
  { name: '木星', symbol: '♃', body: Astronomy.Body.Jupiter },
  { name: '土星', symbol: '♄', body: Astronomy.Body.Saturn },
  { name: '天王星', symbol: '♅', body: Astronomy.Body.Uranus },
  { name: '海王星', symbol: '♆', body: Astronomy.Body.Neptune },
  { name: '冥王星', symbol: '♇', body: Astronomy.Body.Pluto },
];

function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

export function calculateChart(
  date: Date,
  location: { lat: number; lng: number },
): AstrologyData {
  const time = Astronomy.MakeTime(date);

  // Calculate planets
  const planets: PlanetPosition[] = BODIES.map((b) => {
    const vector = Astronomy.GeoVector(b.body, time, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    return {
      name: b.name,
      symbol: b.symbol,
      longitude: normalizeAngle(ecliptic.elon),
    };
  });

  // Calculate houses (simplified Placidus)
  const siderealTime = Astronomy.SiderealTime(time);
  let lst = siderealTime + location.lng / 15.0;
  if (lst < 0) lst += 24;
  if (lst >= 24) lst -= 24;

  const ramc = lst * 15;
  const eps = 23.4392911 * (Math.PI / 180);
  const latRad = location.lat * (Math.PI / 180);
  const ramcRad = ramc * (Math.PI / 180);

  // MC
  const mcRad = Math.atan2(
    Math.sin(ramcRad),
    Math.cos(ramcRad) * Math.cos(eps),
  );
  const mc = normalizeAngle((mcRad * 180) / Math.PI);

  // ASC
  const top = -Math.cos(ramcRad);
  const bottom =
    Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  const ascRad = Math.atan2(top, bottom);
  const asc = normalizeAngle((ascRad * 180) / Math.PI);

  // IC and DESC
  const ic = normalizeAngle(mc + 180);
  const desc = normalizeAngle(asc + 180);

  // Porphyry houses
  let q1Size = ic - asc;
  if (q1Size < 0) q1Size += 360;
  const h1 = asc;
  const h2 = normalizeAngle(asc + q1Size / 3);
  const h3 = normalizeAngle(asc + (2 * q1Size) / 3);
  const h4 = ic;

  let q2Size = desc - ic;
  if (q2Size < 0) q2Size += 360;
  const h5 = normalizeAngle(ic + q2Size / 3);
  const h6 = normalizeAngle(ic + (2 * q2Size) / 3);
  const h7 = desc;

  let q3Size = mc - desc;
  if (q3Size < 0) q3Size += 360;
  const h8 = normalizeAngle(desc + q3Size / 3);
  const h9 = normalizeAngle(desc + (2 * q3Size) / 3);
  const h10 = mc;

  let q4Size = asc - mc;
  if (q4Size < 0) q4Size += 360;
  const h11 = normalizeAngle(mc + q4Size / 3);
  const h12 = normalizeAngle(mc + (2 * q4Size) / 3);

  const houses: HouseCusp[] = [
    { id: 1, angle: h1 },
    { id: 2, angle: h2 },
    { id: 3, angle: h3 },
    { id: 4, angle: h4 },
    { id: 5, angle: h5 },
    { id: 6, angle: h6 },
    { id: 7, angle: h7 },
    { id: 8, angle: h8 },
    { id: 9, angle: h9 },
    { id: 10, angle: h10 },
    { id: 11, angle: h11 },
    { id: 12, angle: h12 },
  ];

  return {
    planets,
    houses,
    ascendant: asc,
    midheaven: mc,
  };
}
```

- [ ] **Step 4: Create chart service**

```typescript
// server/src/modules/chart/chart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateNatalDto, CreateSynastryDto } from './dto/chart.dto';
import { calculateChart } from './astrology.engine';

@Injectable()
export class ChartService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createNatal(userId: string, dto: CreateNatalDto) {
    const chartData = calculateChart(
      new Date(dto.birthDate),
      { lat: dto.birthLat, lng: dto.birthLng },
    );

    const chart = await this.prisma.chart.create({
      data: {
        userId,
        name: dto.name || '我的本命盘',
        chartType: 'natal',
        birthDate: new Date(dto.birthDate),
        birthTime: dto.birthTime,
        birthCity: dto.birthCity,
        birthLat: dto.birthLat,
        birthLng: dto.birthLng,
        planets: chartData.planets as any,
        houses: chartData.houses as any,
        aspects: [] as any,
        ascendant: chartData.ascendant,
        midheaven: chartData.midheaven,
      },
    });

    return chart;
  }

  async createSynastry(userId: string, dto: CreateSynastryDto) {
    const chartA = calculateChart(
      new Date(dto.birthDateA),
      { lat: dto.birthLatA, lng: dto.birthLngA },
    );

    const chartB = calculateChart(
      new Date(dto.birthDateB),
      { lat: dto.birthLatB, lng: dto.birthLngB },
    );

    const chart = await this.prisma.chart.create({
      data: {
        userId,
        name: dto.name || `与${dto.partnerName || '对方'}的合盘`,
        chartType: 'synastry',
        birthDate: new Date(dto.birthDateA),
        birthTime: dto.birthTimeA,
        birthCity: dto.birthCityA,
        birthLat: dto.birthLatA,
        birthLng: dto.birthLngA,
        partnerBirthDate: new Date(dto.birthDateB),
        partnerBirthTime: dto.birthTimeB,
        partnerBirthCity: dto.birthCityB,
        planets: chartA.planets as any,
        houses: chartA.houses as any,
        aspects: { chartB: chartB.planets } as any,
        ascendant: chartA.ascendant,
        midheaven: chartA.midheaven,
      },
    });

    return chart;
  }

  async findById(id: string) {
    const chart = await this.prisma.chart.findUnique({ where: { id } });
    if (!chart) throw new NotFoundException('星盘不存在');
    return chart;
  }

  async findByUser(userId: string) {
    return this.prisma.chart.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async generateReading(chartId: string, persona: string = 'neon') {
    const chart = await this.findById(chartId);

    const reading = await this.aiService.natalReading({
      chartData: {
        planets: chart.planets as any[],
        houses: chart.houses as any[],
        aspects: chart.aspects as any[],
      },
      persona,
    });

    await this.prisma.chart.update({
      where: { id: chartId },
      data: {
        aiReading: reading,
        aiReadingAt: new Date(),
      },
    });

    return reading;
  }

  async delete(id: string, userId: string) {
    const chart = await this.findById(id);
    if (chart.userId !== userId) {
      throw new NotFoundException('无权删除此星盘');
    }
    return this.prisma.chart.delete({ where: { id } });
  }
}
```

- [ ] **Step 5: Create chart controller**

```typescript
// server/src/modules/chart/chart.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateNatalDto, CreateSynastryDto } from './dto/chart.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('chart')
@UseGuards(JwtAuthGuard)
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Post('natal')
  async createNatal(@Request() req, @Body() dto: CreateNatalDto) {
    return this.chartService.createNatal(req.user.userId, dto);
  }

  @Post('synastry')
  async createSynastry(@Request() req, @Body() dto: CreateSynastryDto) {
    return this.chartService.createSynastry(req.user.userId, dto);
  }

  @Get('list')
  async list(@Request() req) {
    return this.chartService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chartService.findById(id);
  }

  @Post(':id/reading')
  async generateReading(
    @Param('id') id: string,
    @Body('persona') persona?: string,
  ) {
    return this.chartService.generateReading(id, persona);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.chartService.delete(id, req.user.userId);
  }
}
```

- [ ] **Step 6: Create chart module**

```typescript
// server/src/modules/chart/chart.module.ts
import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}
```

- [ ] **Step 7: Update app.module.ts**

```typescript
// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChartModule } from './modules/chart/chart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    AuthModule,
    UserModule,
    ChartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- [ ] **Step 8: Test chart endpoints**

```bash
# Create natal chart (with auth token)
curl -X POST http://localhost:3000/api/chart/natal \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "birthDate": "1990-01-15",
    "birthTime": "14:30",
    "birthCity": "北京",
    "birthLat": 39.9042,
    "birthLng": 116.4074
  }'

# List charts
curl http://localhost:3000/api/chart/list \
  -H "Authorization: Bearer <token>"
```

- [ ] **Step 9: Commit**

```bash
git add server/
git commit -m "feat: add chart module with astrology engine"
```

---

## Task 6: Update Frontend to Use Backend API

**Covers:** S7 (Frontend Integration)

**Files:**
- Modify: `src/lib/api.ts`
- Modify: `src/services/aiService.ts`
- Create: `src/hooks/useAuth.ts`

- [ ] **Step 1: Create API client**

```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
});

// Request interceptor - add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
```

- [ ] **Step 2: Create auth hook**

```typescript
// src/hooks/useAuth.ts
import { create } from 'zustand';
import api from '../lib/api';

interface User {
  id: string;
  phone?: string;
  nickname: string;
  avatarUrl?: string;
  isPremium: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  sendSms: (phone: string) => Promise<void>;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  sendSms: async (phone: string) => {
    await api.post('/auth/sms/send', { phone });
  },

  login: async (phone: string, code: string) => {
    const result: any = await api.post('/auth/sms/login', { phone, code });
    localStorage.setItem('access_token', result.accessToken);
    localStorage.setItem('refresh_token', result.refreshToken);
    set({ user: result.user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const user: any = await api.get('/auth/profile');
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
```

- [ ] **Step 3: Update AI service to use backend**

```typescript
// src/services/aiService.ts
import api from '../lib/api';

export const fetchTarotReading = async (
  question: string,
  cards: string[],
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/tarot', { question, cards, persona });
  return result.data;
};

export const fetchNatalReading = async (
  chartData: any,
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/natal', { chartData, persona });
  return result.data;
};

export const fetchSynastryReading = async (
  chartA: any[],
  chartB: any[],
  partnerName: string,
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/synastry', {
    chartA,
    chartB,
    partnerName,
    persona,
  });
  return result.data;
};
```

- [ ] **Step 4: Create .env file for frontend**

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000/api
```

- [ ] **Step 5: Test frontend-backend integration**

```bash
# Start backend
cd server && npm run start:dev

# Start frontend
cd .. && npm run dev
```

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: integrate frontend with backend API"
```

---

## Summary

After completing all tasks:

1. ✅ NestJS backend initialized
2. ✅ PostgreSQL database with Prisma ORM
3. ✅ AI proxy service (hides API keys)
4. ✅ JWT authentication system
5. ✅ Star chart module with astrology engine
6. ✅ Frontend-backend integration

**Next Steps (Phase 2):**
- Tarot divination module
- Lenormand module
- Fortune system
- Payment integration
