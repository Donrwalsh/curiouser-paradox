import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsModule } from './comics/comics.module';
import { ConfigModule } from '@nestjs/config';

const CONTAINERIZED = process.env.CONTAINERIZED === 'true';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ComicsModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING, {
      dbName: 'curiouserParadox',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
