import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { LoginService } from './login.service';
import { LoginDto } from '../../dto/login.dto';
import { API_ROUTES } from '../../../../shared/constants/api-routes';

@Controller(API_ROUTES.AUTH.BASE)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post(API_ROUTES.AUTH.LOGIN)
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
