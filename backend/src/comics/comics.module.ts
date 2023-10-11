import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comic', schema: ComicSchema }]),
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
