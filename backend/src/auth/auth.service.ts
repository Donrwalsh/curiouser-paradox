import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    //Manually generate hash:
    // const hash = await bcrypt.hash(pass, saltRounds, function (err, hash) {
    //   console.log(hash);
    // });

    const user = await this.usersService.findOne(username);
    const match = await bcrypt.compareSync(pass, user?.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashTime(password: string, saltRounds: number) {
    var begin = Date.now();
    bcrypt.hashSync(password, saltRounds);
    var end = Date.now();
    let result = {
      saltRounds: saltRounds,
      time: (end - begin) / 1000 + ' seconds',
    };
    return result;
  }
}
