import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ReactionService } from './reaction.service';
import { Reaction } from './reaction.type';

@Resolver()
export class ReactionResolver {
  constructor(private reactionService: ReactionService) {}

  @Mutation(() => Reaction, {
    description: 'React to post',
    name: 'createReaction',
  })
  @UseGuards(AuthenticationGuard)
  public async createReaction(
    @Args('reactionEmoji', { type: () => String }) reactionEmoji: string,
    @Args('postId', { type: () => String }) postId: string,
    @CurrentUser() currentUser,
  ): Promise<Reaction> {
    return this.reactionService.createReaction(
      reactionEmoji,
      postId,
      currentUser.sub,
    );
  }
}
