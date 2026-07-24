import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateTaskDto,
  ) {
    const board =
      await this.prisma.board.findUnique({
        where: {
          id: dto.boardId,
        },
        include: {
          project: true,
        },
      });

    if (!board) {
      throw new ForbiddenException(
        'Board not found',
      );
    }

    const membership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId:
              board.project.workspaceId,
          },
        },
      });

    if (!membership) {
      throw new ForbiddenException(
        'You are not a workspace member',
      );
    }

    return this.prisma.task.create({
      data: {
        boardId: dto.boardId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: dto.status,
        assigneeId: dto.assigneeId,
        reporterId: userId,
        dueDate: dto.dueDate
          ? new Date(dto.dueDate)
          : null,
      },
    });
  }

  async findAll(
    boardId: string,
  ) {
    return this.prisma.task.findMany({
      where: {
        boardId,
      },
    });
  }
}