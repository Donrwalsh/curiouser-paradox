import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

// TODO
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Don',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'Laura',
      password: 'changeme',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
