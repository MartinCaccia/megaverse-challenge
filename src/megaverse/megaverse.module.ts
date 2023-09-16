import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MegaverseService } from './megaverse.service';
import { MegaverseController } from './megaverse.controller';

@Module({
  imports: [
    ConfigModule,  
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => {
        const baseURL = configService.get<string>('megaverse_url');
        const timeout = configService.get('HTTP_TIMEOUT');       
        return {
          baseURL: baseURL,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: timeout,
        };
      },
      inject: [ConfigService],
    }),          
  ],
  controllers: [MegaverseController],
  providers: [MegaverseService],
})
export class MegaverseModule {}
