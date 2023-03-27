import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReactionResolver } from './reaction.resolver';
import { ReactionService } from './reaction.service';

@Module({
  imports: [PrismaModule],
  providers: [ReactionService, ReactionResolver],
})
export class ReactionModule {}
