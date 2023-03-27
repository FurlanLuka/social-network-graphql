import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { AuthenticationService } from '../authentication/authentication.service';
import { PrismaService } from '../prisma/prisma.service';
import { Token } from './user.type';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private authenticationService: AuthenticationService,
  ) {}

  public async createUser(username: string, password: string): Promise<Token> {
    const findResult: User | null = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (findResult !== null) {
      throw new GraphQLError('Username already exists', {
        extensions: {
          code: 'USERNAME_ALREADY_EXISTS',
        },
      });
    }

    /**
     * This is example implementation and passwords are saved
     * in plaintext. If used in production please hash the passwords
     */
    const creationResult = await this.prismaService.user.create({
      data: {
        username,
        password,
      },
    });

    const accessToken = this.authenticationService.createToken(
      username,
      creationResult.id,
    );

    return {
      accessToken,
      username,
    };
  }

  public async loginUser(username: string, password: string): Promise<Token> {
    const findResult: User | null = await this.prismaService.user.findFirst({
      where: {
        username,
        password,
      },
    });

    if (findResult === null) {
      throw new GraphQLError('Invalid login credentials', {
        extensions: {
          code: 'INVALID_LOGIN_CREDENTIALS',
        },
      });
    }

    const accessToken = this.authenticationService.createToken(
      username,
      findResult.id,
    );

    return {
      accessToken,
      username,
    };
  }
}
