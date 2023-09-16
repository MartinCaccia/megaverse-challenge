import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check Services Auth',
    description: 'Health check for ms',
  })
  @Get('/health')
  checkHealth(): Record<string, string> {
    return this.appService.checkHealth();
  }
}
