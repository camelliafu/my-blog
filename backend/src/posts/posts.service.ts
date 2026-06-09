import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        slug,
      },
    });

    if (!post) {
      throw new NotFoundException('文章不存在');
    }

    return post;
  }
}
