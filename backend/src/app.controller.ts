import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/latest')
  getLatest(@Res() response): string {
    return response.status(HttpStatus.OK).json({
      title: 'Origins',
      altText: 'Oh god, how did this get here I am not good with computer',
      path: 'so_long.png',
      index: 0,
    });
  }
}
