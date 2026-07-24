import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateCommentDto,
  ) {
    return this.prisma.comment.create({
      data: {
        taskId: dto.taskId,
        authorId: userId,
        content: dto.content,
      },
    });
  }

  async findAll(taskId: string) {
    return this.prisma.comment.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}