import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        slug: createPostDto.slug,
        title: createPostDto.title,
        description: createPostDto.description,
        date: new Date(createPostDto.date),
        tags: createPostDto.tags,
        content: createPostDto.content,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('文章不存在');
    }

    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
        date: updatePostDto.date ? new Date(updatePostDto.date) : undefined,
      },
    });
  }

  async remove(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('文章不存在');
    }

    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
