import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, CreateCommentDto, PostQueryDto } from './dto/community.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, dto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { nickname: true, zodiacSign: true },
    });

    const post = await this.prisma.$queryRaw`
      INSERT INTO posts (user_id, content, post_type, image_url, divination_id, user_nickname, user_zodiac, created_at)
      VALUES (${userId}, ${dto.content}, ${dto.postType || 'general'}, ${dto.imageUrl || null}, ${dto.divinationId || null}, ${user?.nickname || '匿名'}, ${user?.zodiacSign || null}, NOW())
      RETURNING *
    `;

    return (post as any[])[0];
  }

  async getPosts(query: PostQueryDto, currentUserId?: string) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

    if (query.zodiac) {
      whereClause += ` AND user_zodiac = $${params.length + 1}`;
      params.push(query.zodiac);
    }

    if (query.postType) {
      whereClause += ` AND post_type = $${params.length + 1}`;
      params.push(query.postType);
    }

    const posts = await this.prisma.$queryRawUnsafe(`
      SELECT p.*, 
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count
        ${currentUserId ? `, (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id AND user_id = $${params.length + 1}) as user_liked` : ''}
      FROM posts p
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `, ...params, limit, offset);

    const countResult = await this.prisma.$queryRawUnsafe(`
      SELECT COUNT(*) as total FROM posts ${whereClause}
    `, ...params);

    return {
      items: posts,
      total: Number((countResult as any[])[0]?.total || 0),
      page,
      limit,
    };
  }

  async getPostById(id: string, currentUserId?: string) {
    const posts = await this.prisma.$queryRaw`
      SELECT p.*, 
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count
      FROM posts p
      WHERE p.id = ${id}
    `;

    const post = (posts as any[])[0];
    if (!post) throw new NotFoundException('帖子不存在');

    // Get comments
    const comments = await this.prisma.$queryRaw`
      SELECT c.*, u.nickname as user_nickname, u.avatar_url
      FROM post_comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ${id}
      ORDER BY c.created_at ASC
    `;

    // Check if user liked
    let userLiked = false;
    if (currentUserId) {
      const likes = await this.prisma.$queryRaw`
        SELECT COUNT(*) as count FROM post_likes
        WHERE post_id = ${id} AND user_id = ${currentUserId}
      `;
      userLiked = Number((likes as any[])[0]?.count || 0) > 0;
    }

    return { ...post, comments, userLiked };
  }

  async likePost(userId: string, postId: string) {
    // Check if already liked
    const existing = await this.prisma.$queryRaw`
      SELECT id FROM post_likes WHERE post_id = ${postId} AND user_id = ${userId}
    `;

    if ((existing as any[]).length > 0) {
      // Unlike
      await this.prisma.$queryRaw`
        DELETE FROM post_likes WHERE post_id = ${postId} AND user_id = ${userId}
      `;
      return { liked: false };
    } else {
      // Like
      await this.prisma.$queryRaw`
        INSERT INTO post_likes (post_id, user_id, created_at)
        VALUES (${postId}, ${userId}, NOW())
      `;
      return { liked: true };
    }
  }

  async addComment(userId: string, postId: string, dto: CreateCommentDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { nickname: true },
    });

    const comment = await this.prisma.$queryRaw`
      INSERT INTO post_comments (post_id, user_id, content, user_nickname, created_at)
      VALUES (${postId}, ${userId}, ${dto.content}, ${user?.nickname || '匿名'}, NOW())
      RETURNING *
    `;

    return (comment as any[])[0];
  }

  async deletePost(userId: string, postId: string) {
    const posts = await this.prisma.$queryRaw`
      SELECT user_id FROM posts WHERE id = ${postId}
    `;

    const post = (posts as any[])[0];
    if (!post) throw new NotFoundException('帖子不存在');
    if (post.user_id !== userId) throw new ForbiddenException('无权删除');

    await this.prisma.$queryRaw`DELETE FROM post_likes WHERE post_id = ${postId}`;
    await this.prisma.$queryRaw`DELETE FROM post_comments WHERE post_id = ${postId}`;
    await this.prisma.$queryRaw`DELETE FROM posts WHERE id = ${postId}`;

    return { success: true };
  }
}
