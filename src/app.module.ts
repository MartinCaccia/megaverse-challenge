import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { MegaverseModule } from './megaverse/megaverse.module';
import { JoiValidationSchema } from './config/joi.validation';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MegaverseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
