import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class SignInDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class TokenDTO {
  @ApiProperty()
  refreshToken: string;
}

export class HashTimeDTO {
  @ApiProperty()
  password: string;

  @ApiProperty()
  saltRounds: number;
}

export class ResetPasswordDTO {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPasswordOne: string;

  @ApiProperty()
  newPasswordTwo: string;
}
