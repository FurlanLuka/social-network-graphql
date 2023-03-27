import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  public createToken(username: string, userId: string) {
    const accessToken = sign(
      {
        username,
      },
      this.configService.get('JWT_SECRET'),
      {
        subject: userId,
        expiresIn: '2h',
      },
    );

    return accessToken;
  }
}
