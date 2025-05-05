import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  postUsers(nickname: string, email: string, password: string) {
    return {
      nickname,
      email,
      password,
    };
  }
}
