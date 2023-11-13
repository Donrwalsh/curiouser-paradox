import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

const saltRounds = 12;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async resetPassword(
    accessToken: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const decoded = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.ACCESS_SECRET,
    });
    const user = await this.usersService.findOne(decoded.username);
    const match = await bcrypt.compareSync(oldPassword, user?.passwordHash);
    if (!match) {
      throw new UnauthorizedException();
    }
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    await this.usersService.updateUser({
      userId: user.userId,
      passwordHash: newPasswordHash,
    });
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const match = await bcrypt.compareSync(pass, user?.passwordHash);
    if (!match) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.userId, user.username);

    const hashedRefreshToken = bcrypt.hashSync(
      [...tokens.refreshToken].reverse().join(''),
      saltRounds,
    );
    await this.usersService.updateUser({
      userId: user.userId,
      refreshHash: hashedRefreshToken,
    });

    return tokens;
  }

  async signOut(accessToken: string) {
    const decoded = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.ACCESS_SECRET,
    });
    await this.usersService.updateUser({
      userId: decoded.sub,
      refreshHash: '',
    });
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

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.ACCESS_SECRET,
          expiresIn: '5m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.REFRESH_SECRET,
          expiresIn: '2h',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      const user = await this.usersService.findOne(decoded.username);
      const match = await bcrypt.compareSync(
        [...refreshToken].reverse().join(''),
        user?.refreshHash,
      );
      if (!match) {
        throw new UnauthorizedException();
      }
      const tokens = await this.getTokens(decoded.sub, decoded.username);
      const hashedRefreshToken = bcrypt.hashSync(
        [...tokens.refreshToken].reverse().join(''),
        saltRounds,
      );
      await this.usersService.updateUser({
        userId: user.userId,
        refreshHash: hashedRefreshToken,
      });
      return tokens;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
