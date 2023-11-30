import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ComicsModule } from 'src/comics/comics.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ComicsModule,
    UsersModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING, {
      dbName: 'curiouserParadox',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
