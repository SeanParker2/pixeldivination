-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT,
    "email" TEXT,
    "nickname" TEXT NOT NULL,
    "avatar_url" TEXT,
    "gender" TEXT,
    "birth_date" TEXT,
    "birth_time" TEXT,
    "birth_city" TEXT,
    "birth_lat" REAL,
    "birth_lng" REAL,
    "zodiac_sign" TEXT,
    "kua_number" INTEGER,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Shanghai',
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "premium_until" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "charts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "chart_type" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "birth_time" TEXT,
    "birth_city" TEXT,
    "birth_lat" REAL,
    "birth_lng" REAL,
    "partner_birth_date" TEXT,
    "partner_birth_time" TEXT,
    "partner_birth_city" TEXT,
    "planets" TEXT NOT NULL,
    "houses" TEXT NOT NULL,
    "aspects" TEXT NOT NULL,
    "ascendant" REAL,
    "midheaven" REAL,
    "ai_reading" TEXT,
    "ai_reading_at" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "charts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "divinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "div_type" TEXT NOT NULL,
    "deck_type" TEXT,
    "spread_type" TEXT,
    "cards" TEXT,
    "bazi_data" TEXT,
    "question" TEXT,
    "ai_reading" TEXT,
    "ai_persona" TEXT,
    "is_free" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "divinations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fortunes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "zodiac_sign" TEXT NOT NULL,
    "fortune_date" DATETIME NOT NULL,
    "fortune_type" TEXT NOT NULL DEFAULT 'daily',
    "scores" TEXT NOT NULL,
    "texts" TEXT NOT NULL,
    "ai_persona" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fortunes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "plan_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "payment_id" TEXT,
    "payment_amount" REAL,
    "payment_method" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "order_type" TEXT NOT NULL,
    "product_id" TEXT,
    "product_name" TEXT,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payment_id" TEXT,
    "payment_method" TEXT,
    "paid_at" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "charts_user_id_idx" ON "charts"("user_id");

-- CreateIndex
CREATE INDEX "charts_chart_type_idx" ON "charts"("chart_type");

-- CreateIndex
CREATE INDEX "divinations_user_id_idx" ON "divinations"("user_id");

-- CreateIndex
CREATE INDEX "divinations_div_type_idx" ON "divinations"("div_type");

-- CreateIndex
CREATE INDEX "divinations_created_at_idx" ON "divinations"("created_at");

-- CreateIndex
CREATE INDEX "fortunes_user_id_fortune_date_idx" ON "fortunes"("user_id", "fortune_date");

-- CreateIndex
CREATE UNIQUE INDEX "fortunes_user_id_fortune_date_fortune_type_key" ON "fortunes"("user_id", "fortune_date", "fortune_type");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_status_idx" ON "subscriptions"("user_id", "status");

-- CreateIndex
CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at");
