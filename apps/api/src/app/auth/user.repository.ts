import { AuthCredentialsDto } from '@artic-market/data';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;
    const salt = await bcryptjs.genSalt();
    const user = this.create();
    user.userName = userName;
    user.salt = salt;
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException(error.detail);
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcryptjs.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<string> {
    let userNameValidater = null;
    const { userName, password } = authCredentialsDto;
    const user = await this.findOne({ userName });
    if (user && (await user.validatePasssword(password))) {
      userNameValidater = user.userName;
    }
    return userNameValidater;
  }
}
