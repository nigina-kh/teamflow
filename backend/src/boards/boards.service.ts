import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateBoardDto,
  ) {
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: dto.projectId,
        },
      });

    if (!project) {
      throw new ForbiddenException(
        'Project not found',
      );
    }

    const membership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId: project.workspaceId,
          },
        },
      });

    if (!membership) {
      throw new ForbiddenException(
        'You are not a workspace member',
      );
    }

    const boards =
      await this.prisma.board.count({
        where: {
          projectId: dto.projectId,
        },
      });

    return this.prisma.board.create({
      data: {
        projectId: dto.projectId,
        name: dto.name,
        position: boards,
      },
    });
  }

  async findAll(
    projectId: string,
  ) {
    return this.prisma.board.findMany({
      where: {
        projectId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }
}