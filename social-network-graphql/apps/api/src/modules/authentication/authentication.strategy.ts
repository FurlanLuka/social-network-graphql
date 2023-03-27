import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(
  Strategy,
  'jwt-auth',
) {
  constructor() {
    super({
      secretOrKey: process.env['JWT_SECRET'],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
    });
  }

  validate(payload: any, done: VerifiedCallback): void {
    if (!payload) {
      done(
        new GraphQLError('Unauthorised', {
          extensions: {
            code: 'UNAUTHORISED',
          },
        }),
        false,
      );
    }

    return done(null, payload);
  }
}
