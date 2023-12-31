import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: number;

  @Prop()
  username: string;

  @Prop()
  passwordHash: string;

  @Prop()
  refreshHash: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly userId: number;
  readonly username: string;
  readonly passwordHash: string;
  readonly refreshHash: string;
}

export class UpdateUserDto {
  readonly refreshHash: string;
}
