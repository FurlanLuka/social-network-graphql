import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reaction } from './reaction.type';

@Injectable()
export class ReactionService {
  constructor(private prismaService: PrismaService) {}

  public createReaction(
    reactionEmoji: string,
    postId: string,
    authorId: string,
  ): Promise<Reaction> {
    return this.prismaService.reaction.create({
      data: {
        reactionEmoji,
        postId,
        authorId,
      },
    });
  }
}
