import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/auth.guard';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const FakeConfigService = {
      provide: ConfigService,
      useValue: {
        get: jest.fn((Key: string, DefaultValue: string) => {
          switch (Key) {
            case 'CONNECTION_STRING':
              return 'mongodb://mongo:27017/';
            case 'PORT':
              return '3333';
            default:
              return DefaultValue;
          }
        }),
      },
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, FakeConfigService, JwtService, AuthGuard],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
