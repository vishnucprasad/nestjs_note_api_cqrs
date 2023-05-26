import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserSchema } from '../schema';
import { UserDto } from '../dto';

@Injectable()
export class UserDtoRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findUserByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne(
      { email } as FilterQuery<UserSchema>,
      {},
      { lean: true },
    );

    if (!user) {
      throw new UnauthorizedException('There is no user with this email');
    }

    return user;
  }
}
