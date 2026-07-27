import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async getDashboard() {

    const activeProjects =
      await this.prisma.project.count({
        where: {
          isArchived: false,
        },
      });

    const completedTasks =
      await this.prisma.task.count({
        where: {
          status: 'DONE',
        },
      });

    const teamMembers =
      await this.prisma.user.count();

    const deadlines =
      await this.prisma.task.count({
        where: {
          dueDate: {
            not: null,
          },
        },
      });

    return {

      stats: {
        activeProjects,
        completedTasks,
        teamMembers,
        deadlines,
      },

      projects:
        await this.prisma.project.findMany({

          take: 5,

          orderBy: {
            createdAt: 'desc',
          },

        }),

      tasks:
        await this.prisma.task.findMany({

          take: 5,

          orderBy: {
            createdAt: 'desc',
          },

        }),

    };

  }

}