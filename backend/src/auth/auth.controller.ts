import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  HashTimeDTO,
  ResetPasswordDTO,
  SignInDTO,
  TokenDTO,
  Tokens,
} from 'src/auth/auth.model';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Begin a user session',
  })
  @ApiOkResponse({
    description: 'Sign in was successful.',
    type: Tokens,
  })
  @ApiNotFoundResponse({
    description: 'Invalid user.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid password.',
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('sign-out')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'End an existing user session',
  })
  @ApiOkResponse({
    description: 'Sign out was successful.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @HttpCode(HttpStatus.OK)
  signOut(@Req() req: Request) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    this.authService.signOut(accessToken);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Reset password for current session's user",
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiOkResponse({
    description: 'Password reset successfully.',
  })
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Res() response,
    @Req() req: Request,
    @Body() resetDTO: ResetPasswordDTO,
  ) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    this.authService.resetPassword(
      accessToken,
      resetDTO.oldPassword,
      resetDTO.newPasswordOne,
    );
    return response.status(HttpStatus.OK).json({
      message: 'Password reset successfully.',
    });
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'End an existing user session',
  })
  refreshTokens(@Body() token: TokenDTO) {
    return this.authService.refreshTokens(token.refreshToken);
  }

  @Post('hash-time')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Measure hash time with dynamic saltRounds',
  })
  @ApiOkResponse({
    description: 'Hash-Time was successful.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      example: {
        password:
          'sample-password-that-can-be-anything-really-because-the-hashed-value-gets-discarded',
        saltRounds: 12,
      },
    },
  })
  hashTime(@Body() passwordDto: HashTimeDTO) {
    return this.authService.hashTime(
      passwordDto.password,
      passwordDto.saltRounds,
    );
  }
}
