import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Match, NotMatch } from 'src/common/validators';

export class TokensDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SignInDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RefreshTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class HashTimeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  saltRounds: number;
}

export class ResetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @NotMatch<ResetPasswordDTO>('newPasswordOne', {
    message: 'old and new passwords cannot be the same',
  })
  @NotMatch<ResetPasswordDTO>('newPasswordTwo', {
    message: 'old and new passwords cannot be the same',
  })
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Match<ResetPasswordDTO>('newPasswordTwo', {
    message: 'both new passwords must be the same',
  })
  newPasswordOne: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPasswordTwo: string;
}
