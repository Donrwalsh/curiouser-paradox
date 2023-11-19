import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminComicsController } from 'src/comics/comics-admin.controller';
import { PublicComicsController } from 'src/comics/comics-public.controller';
import { ComicsService } from 'src/comics/comics.service';
import { ComicSchema } from 'src/comics/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comic', schema: ComicSchema }]),
  ],
  controllers: [AdminComicsController, PublicComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
