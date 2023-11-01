import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ComicsService } from 'src/comics/comics.service';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get('all')
  async getAllComics(@Res() response) {
    try {
      const allComics = await this.comicsService.getAllComics();
      return response.status(HttpStatus.OK).json({
        message: 'Comics obtained successfully',
        payload: allComics,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/indexes')
  async getAllIndexes(@Res() response) {
    try {
      const allIndexes = await this.comicsService.getAllIndexes();
      return response.status(HttpStatus.OK).json({
        message: 'Comic Indexes obtained successfully',
        payload: allIndexes,
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
        payload: latestComic,
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
        payload: specificComic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
