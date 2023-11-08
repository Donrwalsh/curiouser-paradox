import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    const rawToken = req.headers['authorization'].split(' ')[1];
    this.authService.signOut(rawToken);
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

  @Post('refresh')
  @ApiBody({
    description: 'refresh token',
    schema: {
      example: {
        refreshToken: 'string',
      },
    },
  })
  refreshTokens(@Body() token: Record<string, any>) {
    return this.authService.refreshTokens(token.refreshToken);
  }
}
