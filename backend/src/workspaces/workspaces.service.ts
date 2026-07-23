import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceRole } from '@prisma/client';

@Injectable()
export class WorkspacesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateWorkspaceDto,
  ) {
    const slug = dto.name
      .toLowerCase()
      .replace(/\s+/g, '-');

    const workspace = await this.prisma.workspace.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        ownerId: userId,

        memberships: {
          create: {
            userId,
            role: WorkspaceRole.OWNER,
          },
        },
      },

      include: {
        memberships: true,
      },
    });

    return workspace;
  }


  async findUserWorkspaces(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },
    });
  }
}