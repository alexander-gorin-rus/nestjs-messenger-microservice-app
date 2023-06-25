import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { NewUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { login },
      select: ['id', 'firstName', 'lastName', 'login', 'password'],
    });
  }

  async register(newUser: Readonly<NewUserDto>): Promise<UserEntity> {
    const { firstName, lastName, login, password } = newUser;

    const existingUser = await this.findByLogin(login);

    if (existingUser) {
      throw new ConflictException('User with this login already');
    }

    const hashedPassword = await this.hashPassword(password);

    const savedUser = await this.userRepository.save({
      firstName,
      lastName,
      login,
      password: hashedPassword,
    });
    delete savedUser.password;
    return savedUser;
  }

  private async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.findByLogin(login);

    const doesUserExists = !!user;

    if (!doesUserExists) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;
    return user;
  }

  async login(existingUser: Readonly<LoginUserDto>) {
    const { login, password } = existingUser;

    const user = await this.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt, user };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }

    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
