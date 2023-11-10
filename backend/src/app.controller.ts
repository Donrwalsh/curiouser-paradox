import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from 'src/app.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('core')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Hello World!',
    description: 'A basic auth-guarded endpoint for diagnostic usage.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
