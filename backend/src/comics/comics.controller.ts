import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ComicsService } from 'src/comics/comics.service';

@ApiTags('comics')
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('admin/all')
  async getAllComicsAdmin(@Res() response) {
    try {
      const allAdminComics = await this.comicsService.getAllComics();
      return response.status(HttpStatus.OK).json({
        message: 'All Comics obtained successfully',
        payload: allAdminComics,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('all')
  async getAllComics(@Res() response) {
    try {
      const allComics = await this.comicsService.getAllPublishedComics();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comics obtained successfully',
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
