import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComic } from './schema';

@Injectable()
export class ComicsService {
  constructor(@InjectModel('Comic') private comicModel: Model<IComic>) {}

  async getLatest(): Promise<IComic> {
    const latestComics = await this.comicModel.find().sort({ index: -1 });
    console.log(latestComics);

    if (!latestComics || latestComics.length == 0) {
      throw new NotFoundException('Latest comic not found!');
    }
    return latestComics[0];
  }

  async getById(id: number): Promise<IComic> {
    const comic = await this.comicModel.findOne({ index: { $eq: id } });

    if (!comic) {
      throw new NotFoundException('Comic not found!');
    }
    return comic;
  }
}
