import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './post.type';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  public async createPost(content: string, authorId: string): Promise<Post> {
    const creationResult = await this.prismaService.post.create({
      data: {
        content,
        authorId,
      },
    });

    return {
      ...creationResult,
      comments: [],
      reactions: [],
    };
  }

  public async getPosts(limit = 25, olderThen?: number): Promise<Post[]> {
    const searchResult = await this.prismaService.post.findMany({
      ...(olderThen
        ? {
            where: {
              createdAt: {
                lte: new Date(olderThen * 1000),
              },
            },
          }
        : {}),
      include: {
        Reaction: true,
        Comment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return searchResult.map(({ Comment, Reaction, ...rest }) => ({
      ...rest,
      comments: Comment,
      reactions: Reaction,
    }));
  }
}
