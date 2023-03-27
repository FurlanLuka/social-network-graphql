import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CommentService } from './comment.service';
import { Comment } from './comment.type';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Mutation(() => Comment, {
    description: 'Comment on post',
    name: 'createComment',
  })
  @UseGuards(AuthenticationGuard)
  public async createComment(
    @Args('content', { type: () => String }) content: string,
    @Args('postId', { type: () => String }) postId: string,
    @CurrentUser() currentUser,
  ): Promise<Comment> {
    return this.commentService.createComment(content, postId, currentUser.sub);
  }
}
