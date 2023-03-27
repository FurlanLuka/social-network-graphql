import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './comment.type';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  public createComment(
    content: string,
    postId: string,
    authorId: string,
  ): Promise<Comment> {
    return this.prismaService.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });
  }
}
