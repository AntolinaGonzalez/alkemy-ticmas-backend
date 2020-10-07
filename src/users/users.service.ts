import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/users.interfaces';
import { CreateUsersDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly Model: Model<User>,
    private jwtService: JwtService,
  ) {
  }
  public currentUser = []
  async create(createUsersDto: CreateUsersDto): Promise<User> {
    const { email, password } = createUsersDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.Model({
      ...createUsersDto,
      email,
      password: hashedPassword,
    });
    try {
      await user.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new ConflictException(
          'Ya tienes una cuenta registrada con este email',
        );
      }
      throw err;
    }
    return await user.save();
  }

  async find(email: string, password: string) {
    const user = await this.Model.findOne({ email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        return user;
      } else {
        return null;
      }
    }
  }

  async delete(email: string) {
    const user = await this.Model.findOne({ email });
    try {
      await user.delete();
    } catch (err) {
      return err;
    }
  }

  async update(id: string, createUsersDto: CreateUsersDto) {
    const user = await this.Model.findByIdAndUpdate(id, createUsersDto);
    user.save();
    return user;
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user._id };
    this.currentUser = user;
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.Model.findOne({ email });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }

    return null;
  }
}
