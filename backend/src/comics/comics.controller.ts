import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ComicsService } from './comics.service';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get('/indexes')
  async getAllIndexes(@Res() response) {
    try {
      const allIndexes = await this.comicsService.getAllIndexes();
      return response.status(HttpStatus.OK).json({
        message: 'Comic Indexes obtained successfully',
        allIndexes,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/latest')
  async getLatest(@Res() response) {
    try {
      const latestComic = await this.comicsService.getLatest();
      return response.status(HttpStatus.OK).json({
        message: 'Comic obtained successfully',
        latestComic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getSpecific(@Res() response, @Param('id') id: string) {
    try {
      const specificComic = await this.comicsService.getById(parseInt(id));
      return response.status(HttpStatus.OK).json({
        message: 'Comic obtained successfully',
        specificComic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
