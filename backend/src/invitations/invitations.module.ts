import { Module } from '@nestjs/common';

import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';

import { AcceptController } from './accept/accept.controller';

import { PrismaService } from '../prisma/prisma.service';


@Module({
  controllers: [
    InvitationsController,
    AcceptController,
  ],

  providers: [
    InvitationsService,
    PrismaService,
  ],

  exports: [
    InvitationsService,
  ],
})
export class InvitationsModule {}