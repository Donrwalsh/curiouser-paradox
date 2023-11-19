import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Comic {
  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  series: string;

  @ApiProperty()
  @Prop()
  altText: string;

  @ApiProperty()
  @Prop()
  layout: string;

  @ApiProperty()
  @Prop()
  path: string;

  @ApiProperty()
  @Prop()
  index: number;

  @ApiProperty()
  prevIndex: number;

  @ApiProperty()
  nextIndex: number;
}
export const ComicSchema = SchemaFactory.createForClass(Comic);

import { Document } from 'mongoose';
export interface IComic extends Document {
  readonly state: string;
  readonly title: string;
  readonly series: string;
  readonly altText: string;
  readonly layout: string;
  readonly path: string;
  readonly index: number;
  readonly prevIndex: number;
  readonly nextIndex: number;
}
