import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Comic } from 'src/comics/schema';

export class ComicsResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [Comic] })
  payload: Comic[];
}

export class ComicIndexesResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [Number] })
  payload: number[];
}

export class ComicSeriesNamesResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [String] })
  payload: string[];
}

export class SingleComicResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Comic })
  payload: Comic;
}

export enum Layout {
  square = 'square',
  wide = 'wide',
  tall = 'tall',
}

export enum State {
  published = 'published',
  draft = 'draft',
}

export class CreateComicDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  index: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  altText: string;

  @IsOptional()
  @IsString()
  cardText: string;

  @IsNotEmpty()
  @IsEnum(Layout)
  layout:
    | 'square' // 1280x1280
    | 'wide' // 1748x1181
    | 'tall'; // 1240x1754

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  series?: string;

  @IsNotEmpty()
  @IsEnum(State)
  state: 'draft' | 'published';
}

// export class CoreComicResponseDTO<T> {
//   @ApiProperty()
//   message: string;

//   payload: T[];
// }

// export class ComicIndexesResponseBecauseICantDoTheThingWithNumberForSomeReason {
//   @ApiProperty()
//   message: string;

//   @ApiProperty({ type: [Number] })
//   payload: number[];
// }

// export const ApiOkResponseGenericArray = <DataDto extends Type<unknown>>(
//   dataDto: DataDto,
//   description: string,
// ) =>
//   applyDecorators(
//     ApiExtraModels(CoreComicResponseDTO, dataDto, Number),
//     ApiOkResponse({
//       description,
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(CoreComicResponseDTO) },
//           {
//             properties: {
//               data: {
//                 type: 'array',
//                 items: { $ref: getSchemaPath(dataDto) },
//               },
//             },
//           },
//         ],
//       },
//     }),
//   );
