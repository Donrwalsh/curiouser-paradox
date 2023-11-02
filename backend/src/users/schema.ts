import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: number;

  @Prop()
  username: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
}
