import {
  Body,
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { RefreshGuard } from './guard';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(
    @Body() dto: { refreshToken: string },
    @GetUser('_id') userId: string,
  ) {
    return this.authService.refreshToken(dto, userId);
  }
}
