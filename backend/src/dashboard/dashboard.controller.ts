import {
    Controller,
    Get,
    UseGuards,
  } from '@nestjs/common';
  
  import { JwtGuard } from '../auth/jwt/jwt.guard';
  
  import { DashboardService } from './dashboard.service';
  
  @Controller('dashboard')
  @UseGuards(JwtGuard)
  export class DashboardController {
  
    constructor(
      private dashboardService: DashboardService,
    ) {}
  
    @Get()
    getDashboard() {
      return this.dashboardService.getDashboard();
    }
  
  }