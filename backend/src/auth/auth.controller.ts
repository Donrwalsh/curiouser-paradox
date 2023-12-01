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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
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
  RefreshTokenDTO,
  TokensDTO,
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
    type: TokensDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid password.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
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
  async signOut(@Req() req: Request) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    await this.authService.signOut(accessToken);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Reset password for current session's user",
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiOkResponse({
    description: 'Password reset successfully.',
  })
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Res() response,
    @Req() req: Request,
    @Body() resetDTO: ResetPasswordDTO,
  ) {
    const accessToken = req.headers['authorization'].split(' ')[1];
    await this.authService.resetPassword(
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
    summary: 'Refresh access token of a current session',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiCreatedResponse({
    description: 'Session successfully refreshed.',
  })
  @HttpCode(HttpStatus.CREATED)
  async refreshTokens(@Body() token: RefreshTokenDTO) {
    return await this.authService.refreshTokens(token.refreshToken);
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
  @ApiBadRequestResponse({
    description: 'Bad request.',
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
  async hashTime(@Body() passwordDto: HashTimeDTO) {
    return await this.authService.hashTime(
      passwordDto.password,
      passwordDto.saltRounds,
    );
  }
}
