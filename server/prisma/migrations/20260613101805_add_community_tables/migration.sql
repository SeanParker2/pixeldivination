-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "post_type" TEXT NOT NULL DEFAULT 'general',
    "image_url" TEXT,
    "divination_id" TEXT,
    "user_nickname" TEXT NOT NULL,
    "user_zodiac" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_nickname" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "post_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE INDEX "posts_post_type_idx" ON "posts"("post_type");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "post_likes_post_id_user_id_key" ON "post_likes"("post_id", "user_id");

-- CreateIndex
CREATE INDEX "post_comments_post_id_idx" ON "post_comments"("post_id");
