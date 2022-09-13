import {
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { readOnlyCatDto } from './dto/cats.response.dto';
import { Request } from 'express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 로그인한 유저 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: readOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('uploat/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
