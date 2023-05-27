import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { UserDto } from './dto';
import { AccessGuard } from '../auth/guard';

@UseGuards(AccessGuard)
@Controller('user')
export class UserController {
  @Get()
  getUser(@GetUser() user: UserDto): UserDto {
    return user;
  }
}
