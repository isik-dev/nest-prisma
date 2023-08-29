import {
  Controller,
  Get,
  Req,
  Param,
  Query,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsBreedReq, CatsBreedRes } from './create-cats.dto';

const dummyRes = [
  { id: '1', type: 'high-end', origin: 'Germany', weight: '7' },
  { id: '2', type: 'high-end', origin: 'Netherlands', weight: '6.89' },
  { id: '3', type: 'high-end', origin: 'France', weight: '5.78' },
];

@Controller('cats') // prefix
export class AppController {
  @Get() // endpoint: /cats
  findAll(@Req() request: Request): CatsBreedRes[] {
    console.log('request.header', request.body);
    return dummyRes;
  }

  @Post()
  async create(@Body() payload: CatsBreedReq): Promise<CatsBreedRes[]> {
    console.log('payload', payload);
    dummyRes.push({ id: 'randmonlyGeneratedID', ...payload });
    return dummyRes;
  }

  @Get('breed')
  getBreed(@Query('country') country: string): CatsBreedRes[] {
    return dummyRes.filter((cat) => cat.origin === country);
  }

  @Get('breed/:id')
  getUniqueBreed(@Param('id') id: string): CatsBreedRes[] {
    return dummyRes.filter((cat) => cat.id === id);
  }

  @Get('isik-tech') // some
  @Redirect('https://isik-tech.com')
  getDocs() {
    return {
      url: 'https://isik-tech.com',
    };
  }
}
