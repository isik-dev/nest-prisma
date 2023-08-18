import { Controller, Get, Req, Param, Query, Post, Body } from '@nestjs/common';
import { Request } from 'express';

interface ICatsBreed {
  id: string;
  type: string;
  origin: string;
  weight: string;
}

const dummyRes = [
  { id: '1', type: 'high-end', origin: 'Germany', weight: '7' },
  { id: '2', type: 'high-end', origin: 'Netherlands', weight: '6.89' },
  { id: '3', type: 'high-end', origin: 'France', weight: '5.78' },
];

@Controller('cats') // prefix
export class AppController {
  @Get() // endpoint: /cats
  findAll(@Req() request: Request): ICatsBreed[] {
    console.log('request.header', request.body);
    return dummyRes;
  }

  @Post()
  create(
    @Body() payload: { type: string; origin: string; weight: string },
  ): ICatsBreed[] {
    console.log('payload', payload);
    dummyRes.push({ id: 'randmonlyGeneratedID', ...payload });
    return dummyRes;
  }

  @Get('breed')
  getBreed(@Query('country') country: string): ICatsBreed[] {
    console.log('country', country);
    if (country === 'Germany') {
      return dummyRes.filter((cat) => cat.origin === 'Germany');
    } else {
      return dummyRes;
    }
  }

  @Get('breed/:id')
  getUniqueBreed(@Param('id') id: string): ICatsBreed[] {
    return dummyRes.filter((cat) => cat.id === id);
  }
}
