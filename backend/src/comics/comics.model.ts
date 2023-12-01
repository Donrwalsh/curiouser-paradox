import { ApiProperty } from '@nestjs/swagger';
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
  square = 'square', // 1280x1280
  wide = 'wide', // 1748x1181
  tall = 'tall', // 1240x1754
}

export enum State {
  published = 'published',
  draft = 'draft',
}

export class CreateComicDTO {
  @ApiProperty({ type: Number, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  index: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  altText: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardText: string;

  @ApiProperty({ enum: Layout, enumName: 'Layout' })
  @IsNotEmpty()
  @IsEnum(Layout)
  layout: Layout;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  series?: string;

  @ApiProperty({ enum: State, enumName: 'State' })
  @IsNotEmpty()
  @IsEnum(State)
  state: State;
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
