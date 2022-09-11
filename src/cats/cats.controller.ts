import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  UseFilters,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    // throw new HttpException('api is broken', 401);
    return { cats: 'get all cats' };
  }

  @Get(':id')
  gatOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createOneCat() {
    return 'one cat';
  }

  @Put(':id')
  updateCat() {
    return 'one cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'one cat';
  }
}
