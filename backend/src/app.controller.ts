import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnvConnectionString(): string {
    return this.configService.get<string>('CONNECTION_STRING');
  }
}
