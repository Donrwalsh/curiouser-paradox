import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Comic {
  @ApiProperty()
  @Prop()
  index: number;

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
  cardText: string;

  @ApiProperty()
  @Prop()
  layout: string;

  @ApiProperty()
  @Prop()
  image: string;

  @ApiProperty()
  @Prop()
  thumbnail: string;

  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop({ default: todaysDate() })
  published: string;

  @ApiProperty()
  @Prop({ default: todaysDate() })
  updated: string;

  @ApiProperty()
  prevIndex: number;

  @ApiProperty()
  nextIndex: number;
}
export const ComicSchema = SchemaFactory.createForClass(Comic);

import { Document } from 'mongoose';
export interface IComic extends Document {
  readonly index: number;
  readonly title: string;
  readonly altText: string;
  readonly cardText: string;
  readonly layout: string;
  readonly image: string;
  readonly thumbnail: string;
  readonly state: string;
  readonly series: string;
  readonly published: string;
  readonly updated: string;
  readonly prevIndex: number;
  readonly nextIndex: number;
}

export function todaysDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  return (
    yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd)
  );
}
