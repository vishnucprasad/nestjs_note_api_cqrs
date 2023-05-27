import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserSchema } from '../schema';
import { UserDto } from '../dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserDtoRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findUserById(id: string): Promise<UserDto> {
    return await this.userModel.findById(new ObjectId(id), {}, { lean: true });
  }

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
