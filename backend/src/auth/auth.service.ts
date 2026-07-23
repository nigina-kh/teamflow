import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser =
      await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash =
      await bcrypt.hash(dto.password, 10);

    const user =
      await this.usersService.create({
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      });

    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
  }

  async validateUser(
    email: string,
    password: string,
  ) {
    const user =
      await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash,
      );

    if (!valid) {
      return null;
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user =
      await this.validateUser(
        dto.email,
        dto.password,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}