import { Users } from 'src/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { In, Repository } from 'typeorm';
import { UserRequest } from '../http/request/user.request';
import { Role } from '../models/role.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwt: JwtService,
  ) {}

  async signup(user: UserRequest): Promise<Users> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const u = this.userRepository.create(user);

    u.roles = await this.roleRepository.findBy({ id: In(user.role_ids) });

    return await this.userRepository.save(u);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({ username });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }
      return null;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
