import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    description: 'login',
    schema: {
      example: {
        username: 'User',
        password: 'Pass',
      },
    },
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('hashTime')
  @ApiBody({
    description: 'login',
    schema: {
      example: {
        password: 'Pass',
        saltRounds: 10,
      },
    },
  })
  hashTime(@Body() passwordDto: Record<string, any>) {
    return this.authService.hashTime(
      passwordDto.password,
      passwordDto.saltRounds,
    );
  }
}
