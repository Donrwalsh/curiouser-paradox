import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ComicIndexesResponseDTO,
  ComicSeriesNamesResponseDTO,
  ComicsResponseDTO,
  SingleComicResponseDTO,
} from 'src/comics/comics.model';
import { ComicsService } from 'src/comics/comics.service';

@ApiTags('comics')
@Controller('comics')
export class PublicComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Obtain all published comics',
  })
  @ApiOkResponse({
    description: 'Published Comics obtained successfully.',
    type: ComicsResponseDTO,
  })
  // @ApiOkResponseGenericArray(Comic, 'Published Comics obtained successfully.')
  async getPublishedComics(@Res() response) {
    try {
      const publishedComics = await this.comicsService.getAllPublishedComics();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comics obtained successfully',
        payload: publishedComics,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('indexes')
  @ApiOperation({
    summary: 'Obtain indexes of all published comics',
  })
  @ApiOkResponse({
    description: 'Published Comic Indexes obtained successfully.',
    type: ComicIndexesResponseDTO,
  })
  async getPublishedIndexes(@Res() response) {
    try {
      const publishedIndexes = await this.comicsService.getPublishedIndexes();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comic Indexes obtained successfully',
        payload: publishedIndexes,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('series-names')
  @ApiOperation({
    summary: 'Obtain series names of all published comics',
  })
  @ApiOkResponse({
    description: 'Series Names of Published Comics obtained successfully.',
    type: ComicSeriesNamesResponseDTO,
  })
  async getPublishedSeriesNames(@Res() response) {
    try {
      const publishedSeriesNames =
        await this.comicsService.getPublishedSeriesNames();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comic Series Names obtained successfully',
        payload: publishedSeriesNames,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/latest')
  @ApiOperation({
    summary: 'Obtain latest published comic',
  })
  @ApiOkResponse({
    description: 'Latest Published Comic obtained successfully.',
    type: SingleComicResponseDTO,
  })
  async getLatest(@Res() response) {
    try {
      const latestComic = await this.comicsService.getLatest();
      return response.status(HttpStatus.OK).json({
        message: 'Latest Published Comic obtained successfully',
        payload: latestComic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Obtain specific published comic',
  })
  @ApiOkResponse({
    description: 'Comic obtained successfully.',
    type: SingleComicResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Invalid id.',
  })
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
