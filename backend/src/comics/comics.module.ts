import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicsController } from 'src/comics/comics.controller';
import { ComicsService } from 'src/comics/comics.service';
import { ComicSchema } from 'src/comics/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comic', schema: ComicSchema }]),
  ],
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
