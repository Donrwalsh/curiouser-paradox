import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicSchema } from './schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //Currently unused
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Comic', schema: ComicSchema }]),
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
