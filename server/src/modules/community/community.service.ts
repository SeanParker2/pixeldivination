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

    return this.prisma.post.create({
      data: {
        userId,
        content: dto.content,
        postType: dto.postType || 'general',
        imageUrl: dto.imageUrl || null,
        divinationId: dto.divinationId || null,
        userNickname: user?.nickname || '匿名',
        userZodiac: user?.zodiacSign || null,
      },
    });
  }

  async getPosts(query: PostQueryDto, currentUserId?: string) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.zodiac) where.userZodiac = query.zodiac;
    if (query.postType) where.postType = query.postType;

    const [items, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        include: {
          _count: { select: { likes: true, comments: true } },
          ...(currentUserId ? {
            likes: { where: { userId: currentUserId }, select: { id: true } },
          } : {}),
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where }),
    ]);

    const formattedItems = items.map(item => ({
      id: item.id,
      userId: item.userId,
      content: item.content,
      postType: item.postType,
      imageUrl: item.imageUrl,
      divinationId: item.divinationId,
      userNickname: item.userNickname,
      userZodiac: item.userZodiac,
      createdAt: item.createdAt,
      likeCount: item._count.likes,
      commentCount: item._count.comments,
      userLiked: currentUserId ? (item as any).likes?.length > 0 : false,
    }));

    return { items: formattedItems, total, page, limit };
  }

  async getPostById(id: string, currentUserId?: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        _count: { select: { likes: true, comments: true } },
        comments: {
          include: { user: { select: { nickname: true, avatarUrl: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) throw new NotFoundException('帖子不存在');

    let userLiked = false;
    if (currentUserId) {
      const like = await this.prisma.postLike.findUnique({
        where: { postId_userId: { postId: id, userId: currentUserId } },
      });
      userLiked = !!like;
    }

    return {
      ...post,
      likeCount: post._count.likes,
      commentCount: post._count.comments,
      userLiked,
    };
  }

  async likePost(userId: string, postId: string) {
    const existing = await this.prisma.postLike.findUnique({
      where: { postId_userId: { postId, userId } },
    });

    if (existing) {
      await this.prisma.postLike.delete({ where: { id: existing.id } });
      return { liked: false };
    } else {
      await this.prisma.postLike.create({ data: { postId, userId } });
      return { liked: true };
    }
  }

  async addComment(userId: string, postId: string, dto: CreateCommentDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { nickname: true },
    });

    return this.prisma.postComment.create({
      data: {
        postId,
        userId,
        content: dto.content,
        userNickname: user?.nickname || '匿名',
      },
    });
  }

  async deletePost(userId: string, postId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('帖子不存在');
    if (post.userId !== userId) throw new ForbiddenException('无权删除');

    await this.prisma.post.delete({ where: { id: postId } });
    return { success: true };
  }
}
