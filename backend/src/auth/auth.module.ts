import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
      // https://github.com/nestjs/jwt#secret--encryption-key-options
      secretOrKeyProvider: () => {
        return process.env.JWT_SECRET;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
