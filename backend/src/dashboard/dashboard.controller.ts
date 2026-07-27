import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtGuard } from '../auth/jwt/jwt.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
  ) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get()
  getDashboard() {
    return this.dashboardService.getDashboard();
  }
}