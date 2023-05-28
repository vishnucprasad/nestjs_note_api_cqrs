import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { EditUserDto, UserDto } from './dto';
import { AccessGuard } from '../auth/guard';
import { UserService } from './user.service';

@UseGuards(AccessGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@GetUser() user: UserDto): UserDto {
    return user;
  }

  @Patch()
  editUser(@GetUser('_id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
