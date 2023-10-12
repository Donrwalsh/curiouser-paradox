import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Comic {
  @Prop()
  title: string;

  @Prop()
  altText: string;

  @Prop()
  path: string;

  @Prop()
  index: number;

  prevIndex: number;
  nextIndex: number;
}
export const ComicSchema = SchemaFactory.createForClass(Comic);

import { Document } from 'mongoose';
export interface IComic extends Document {
  readonly title: string;
  readonly altText: string;
  readonly path: string;
  readonly index: number;
  readonly prevIndex: number;
  readonly nextIndex: number;
}
