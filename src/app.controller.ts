import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('show')
  getHello(): object {
    return {};
  }

  @Get('/health-check')
  healthCheck() {
    return {
      status: 'OK',
      git_sha: process.env['CURRENT_SHA'],
      built_at: process.env['TIME_OF_BUILD'],
    };
  }
}
