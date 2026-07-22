import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {

    const existingUser =
      await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
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
}