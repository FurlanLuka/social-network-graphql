import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}
