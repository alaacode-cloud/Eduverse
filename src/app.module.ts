import devConfig from './config/dev.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';


@Module({
   imports: [
    ConfigModule.forRoot({//for loading environment variables
          load: [devConfig],
          isGlobal:true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
    }),

  AuthModule
 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
