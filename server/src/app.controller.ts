import {
  Controller,
  HttpCode,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AppService } from './app.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('calculate')
  calculate(@Body() dto: CalculateDto) {
    return this.appService.calculate(dto);
  }
}
