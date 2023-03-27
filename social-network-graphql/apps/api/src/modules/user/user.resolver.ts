import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { UserService } from './user.service';
import { Token } from './user.type';

@Resolver(() => Token)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => Token, {
    description: 'Create new user',
    name: 'createUser',
  })
  async createUser(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<Token> {
    return this.userService.createUser(username, password);
  }

  @Mutation(() => Token, {
    description: 'Login user',
    name: 'loginUser',
  })
  async loginUser(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<Token> {
    return this.userService.loginUser(username, password);
  }

  @Query(() => String)
  @UseGuards(AuthenticationGuard)
  helloWorld() {
    return 'hello world';
  }
}
