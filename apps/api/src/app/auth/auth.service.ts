import { AuthCredentialsDto, JwtPayload } from '@artic-market/data';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(AuthService.name);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const userName = await this.userRepository.validateUserPassword(
      authCredentialsDto
    );
    if (!userName) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const payload: JwtPayload = { userName };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`
    );
    return { accessToken };
  }
}
