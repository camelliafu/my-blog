import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
