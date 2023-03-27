import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationStrategy } from './authentication.strategy';

@Module({
  providers: [AuthenticationService, AuthenticationStrategy],
  exports: [AuthenticationService, AuthenticationStrategy],
})
export class AuthenticationModule {}
