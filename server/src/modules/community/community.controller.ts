import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreatePostDto, CreateCommentDto, PostQueryDto } from './dto/community.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Post('post')
  @UseGuards(JwtAuthGuard)
  async createPost(@Request() req, @Body() dto: CreatePostDto) {
    return this.communityService.createPost(req.user.userId, dto);
  }

  @Get('posts')
  async getPosts(@Query() query: PostQueryDto, @Request() req) {
    return this.communityService.getPosts(query, req.user?.userId);
  }

  @Get('post/:id')
  async getPost(@Param('id') id: string, @Request() req) {
    return this.communityService.getPostById(id, req.user?.userId);
  }

  @Post('post/:id/like')
  @UseGuards(JwtAuthGuard)
  async likePost(@Request() req, @Param('id') id: string) {
    return this.communityService.likePost(req.user.userId, id);
  }

  @Post('post/:id/comment')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.communityService.addComment(req.user.userId, id, dto);
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Request() req, @Param('id') id: string) {
    return this.communityService.deletePost(req.user.userId, id);
  }
}
