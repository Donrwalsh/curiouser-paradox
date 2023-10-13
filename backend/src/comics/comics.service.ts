import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComic } from './schema';

@Injectable()
export class ComicsService {
  constructor(@InjectModel('Comic') private comicModel: Model<IComic>) {}

  async getAllIndexes(): Promise<number[]> {
    return [0, 1, 2];
  }

  async getLatest(): Promise<IComic> {
    const latestComics = await this.comicModel
      .find()
      .sort({ index: -1 })
      .lean();

    if (!latestComics || latestComics.length == 0) {
      throw new NotFoundException('Latest comic not found!');
    }
    return {
      ...latestComics[0],
      prevIndex: latestComics[1].index,
      nextIndex: null,
    };
  }

  async getById(id: number): Promise<IComic> {
    const comic = await this.comicModel.findOne({ index: { $eq: id } }).lean();

    if (!comic) {
      throw new NotFoundException('Comic not found!');
    }

    const prevComic = await this.comicModel
      .findOne({ index: { $lt: id } })
      .sort({ index: -1 })
      .lean();

    const nextComic = await this.comicModel
      .findOne({ index: { $gt: id } })
      .lean();

    return {
      ...comic,
      prevIndex: prevComic ? prevComic.index : null,
      nextIndex: nextComic ? nextComic.index : null,
    };
  }
}
