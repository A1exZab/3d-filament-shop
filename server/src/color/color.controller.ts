import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { ColorService } from './color.service';
import { Public } from 'src/common/decorators';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Public()
  @Get()
  getAllcolors() {
    return this.colorService.getAllColors();
  }

  @Post()
  add(@Body() colorDto: CreateColorDto) {
    return this.colorService.addColor(colorDto);
  }
}
