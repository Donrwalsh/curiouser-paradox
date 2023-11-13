import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, User } from 'src/users/schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findOne(username: string): Promise<IUser> {
    const user = await this.userModel
      .findOne({ username: { $eq: username } })
      .lean();

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async updateUser(payload: Partial<User>) {
    if (payload.userId === undefined) {
      throw new NotFoundException('User not found!');
    }

    const user = await this.userModel.findOneAndUpdate(
      { userId: { $eq: payload.userId } },
      payload,
    );
  }
}
