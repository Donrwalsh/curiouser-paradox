import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
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
  ComicDTO,
  SingleComicResponseDTO,
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

  @Put('comics/update/:index')
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update existing comic data.',
  })
  @ApiOkResponse({
    description: 'Comic updated successfully.',
    type: SingleComicResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  async updateComic(
    @Res() response,
    @Body() body: ComicDTO,
    @Param('index', ParseIntPipe) index: number,
  ) {
    try {
      const updatedComic = await this.comicsService.update(index, body);
      return response.status(HttpStatus.OK).json({
        message: 'Successfully updated comic.',
        payload: updatedComic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('comics/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Submit new comic data.',
  })
  @ApiCreatedResponse({
    description: 'New comic submitted successfully.',
    type: Number,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiBody({
    type: ComicDTO,
    schema: {
      example: {
        // Consider how to make dynamic, as this is a POST
        // and indexes are unique in the database
        index: 0,
        title: 'test',
        altText: 'this is a test',
        cardText: 'this is a test',
        layout: 'square',
        image: 'base64 test',
        thumbnail: 'this is a test',
        series: 'this is a test',
        state: 'draft',
      },
    },
  })
  async submitComic(@Res() response, @Body() body: ComicDTO) {
    try {
      const newComic = await this.comicsService.create(body);
      return response.status(HttpStatus.CREATED).json({
        message: 'Added comic to database.',
        payload: newComic.index,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
