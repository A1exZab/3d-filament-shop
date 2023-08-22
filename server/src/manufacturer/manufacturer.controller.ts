import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerService } from './manufacturer.service';
import { Public } from 'src/common/decorators';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Public()
  @Get()
  getAllManufacturers() {
    return this.manufacturerService.getAllManufacturers();
  }

  @Post()
  add(@Body() manufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.addManufacturer(manufacturerDto);
  }
}
