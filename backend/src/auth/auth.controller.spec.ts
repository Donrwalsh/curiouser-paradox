import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/schema';
import { UsersService } from 'src/users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest
              .fn<Promise<User>, string[]>()
              .mockImplementation((username) =>
                Promise.resolve({
                  userId: -1,
                  username: 'potato',
                  password: 'secret-potato',
                  refreshHash: '',
                }),
              ),
          },
        },
        AuthService,
        JwtService,
        AuthGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
