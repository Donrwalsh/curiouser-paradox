import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

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
              break;
            case 'PORT':
              return '3333';
              break;
            default:
              return DefaultValue;
          }
        }),
      },
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, FakeConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
