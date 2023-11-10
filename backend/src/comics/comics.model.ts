import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
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

export class SingleComicResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Comic })
  payload: Comic;
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
