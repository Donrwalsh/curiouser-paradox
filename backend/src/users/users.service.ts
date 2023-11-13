import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/schema';
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

  async updatePasswordHash(userId: number, passwordHash: string) {
    const user = await this.userModel.findOneAndUpdate(
      { userId: { $eq: userId } },
      {
        passwordHash,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async updateRefreshHash(userId: number, refreshHash: string) {
    const user = await this.userModel.findOneAndUpdate(
      { userId: { $eq: userId } },
      {
        refreshHash,
      },
    );

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async clearRefreshHash(userId: number) {
    const user = await this.userModel.findOneAndUpdate(
      { userId: { $eq: userId } },
      {
        refreshHash: '',
      },
    );

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
