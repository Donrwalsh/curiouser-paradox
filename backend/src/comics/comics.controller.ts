import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ComicIndexesResponseDTO,
  ComicsResponseDTO,
  SingleComicResponseDTO,
} from 'src/comics/comics.model';
import { ComicsService } from 'src/comics/comics.service';

@ApiTags('comics')
@Controller('comics')
export class ComicsController {
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
  @ApiOperation({
    summary: 'Obtain indexes of all published comics',
  })
  @ApiOkResponse({
    description: 'Published Comic Indexes obtained successfully.',
    type: ComicIndexesResponseDTO,
  })
  async getAllIndexes(@Res() response) {
    try {
      const allIndexes = await this.comicsService.getAllIndexes();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comic Indexes obtained successfully',
        payload: allIndexes,
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

  @Get('admin/all')
  @ApiTags('admin')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtain all comics',
  })
  @ApiOkResponse({
    description: 'All Comics obtained successfully.',
    type: ComicsResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid password.',
  })
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
}
