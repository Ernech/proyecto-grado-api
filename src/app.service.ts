import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
  const currentDateTIme = new Date();
  return currentDateTIme.toString()
  }
}
