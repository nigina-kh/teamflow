import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateLabelDto,
  ) {
    const membership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId: dto.workspaceId,
          },
        },
      });

    if (!membership) {
      throw new ForbiddenException(
        'You are not a workspace member',
      );
    }

    return this.prisma.label.create({
      data: {
        workspaceId: dto.workspaceId,
        name: dto.name,
        color: dto.color,
      },
    });
  }

  async findAll(
    workspaceId: string,
  ) {
    return this.prisma.label.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}