import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { PostService } from './post.service';
import { Post } from './post.type';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post, {
    description: 'Create new post',
    name: 'createPost',
  })
  @UseGuards(AuthenticationGuard)
  async createPost(
    @Args('content', { type: () => String }) content: string,
    @CurrentUser() currentUser,
  ): Promise<Post> {
    return this.postService.createPost(content, currentUser.sub);
  }

  @Query(() => [Post])
  async getPosts(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('olderThen', { type: () => Int, nullable: true }) olderThen?: number,
  ): Promise<Post[]> {
    return this.postService.getPosts(limit, olderThen);
  }
}
