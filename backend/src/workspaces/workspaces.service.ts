import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspacesService {

  constructor(
    private prisma: PrismaService,
  ) {}


  async create(
    userId: string,
    data: {
      name: string;
      description?: string;
    },
  ) {

    const slug =
      data.name
        .toLowerCase()
        .replace(/\s+/g, '-');


    return this.prisma.workspace.create({

      data: {
        name: data.name,
        slug,
        description: data.description,

        ownerId: userId,

        memberships: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },

      include: {
        memberships: true,
      },

    });

  }



  async findAll(
    userId: string,
  ) {

    return this.prisma.workspace.findMany({

      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },

      include: {
        memberships: true,
      },

    });

  }



  async findOne(
    id: string,
    userId: string,
  ) {

    return this.prisma.workspace.findFirst({

      where: {
        id,

        memberships: {
          some: {
            userId,
          },
        },
      },


      include: {

        memberships: {

          include: {

            user: {

              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },

            },

          },

        },

      },

    });

  }

}