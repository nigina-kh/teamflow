import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ProjectsModule } from './projects/projects.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { LabelsModule } from './labels/labels.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { InvitationsController } from './invitations/invitations.controller';
import { InvitationsService } from './invitations/invitations.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ProjectsModule,
    BoardsModule,
    TasksModule,
    CommentsModule,
    LabelsModule,
    DashboardModule,
  ],
  controllers: [
    AppController,
    InvitationsController,
  ],
  providers: [
    AppService,
    InvitationsService,
  ],
})
export class AppModule {}