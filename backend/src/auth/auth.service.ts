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

  // Make this return actual content rather than log
  async hashPass(password: string) {
    let result = [];
    for (let saltRounds = 10; saltRounds < 21; saltRounds++) {
      var begin = Date.now();
      // console.time(`bcrypt | cost: ${saltRounds}, time to hash`);
      bcrypt.hashSync(password, saltRounds);
      // console.timeEnd(`bcrypt | cost: ${saltRounds}, time to hash`);
      var end = Date.now();
      result.push({
        saltRounds: saltRounds,
        time: (end - begin) / 1000 + ' seconds',
      });
    }
    return result;
  }
}
