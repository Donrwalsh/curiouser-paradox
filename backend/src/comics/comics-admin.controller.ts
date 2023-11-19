import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ComicIndexesResponseDTO,
  ComicSeriesNamesResponseDTO,
  ComicsResponseDTO,
} from 'src/comics/comics.model';
import { ComicsService } from 'src/comics/comics.service';

@ApiTags('admin')
@Controller('admin')
export class AdminComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Get('comics/all')
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
    description: 'Unauthorized.',
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

  @Get('comics/indexes')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtain indexes of all comics',
  })
  @ApiOkResponse({
    description: 'All Comic Indexes obtained successfully.',
    type: ComicIndexesResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  async getAllIndexes(@Res() response) {
    try {
      const allIndexes = await this.comicsService.getIndexes();
      return response.status(HttpStatus.OK).json({
        message: 'All Comic Indexes obtained successfully',
        payload: allIndexes,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('comics/series-names')
  @ApiOperation({
    summary: 'Obtain series names of all comics',
  })
  @ApiOkResponse({
    description: 'Series Names of All Comics obtained successfully.',
    type: ComicSeriesNamesResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  async getAllSeriesNames(@Res() response) {
    try {
      const allSeriesNames = await this.comicsService.getSeriesNames();
      return response.status(HttpStatus.OK).json({
        message: 'Published Comic Series Names obtained successfully',
        payload: allSeriesNames,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
