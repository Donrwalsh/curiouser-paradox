import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mock_AuthGuard = { CanActive: jest.fn(() => true) };

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
