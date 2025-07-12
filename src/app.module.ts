import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressModule } from './user-address/user-address.module';
import { envVariables } from './config/env.variables';

console.log(`Database Host: ${envVariables.DB_PASSWORD}`);

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      host: envVariables.DB_HOST,
      port: Number(envVariables.DB_PORT),
      type: 'postgres',
      username: envVariables.DB_USERNAME,
      password: envVariables.DB_PASSWORD,
      database: envVariables.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Note: set to false in production
      autoLoadEntities: true,
    }),
    UserAddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
