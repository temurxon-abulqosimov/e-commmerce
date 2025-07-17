import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { UsersModule } from './users/users.module';
import { UserAddressModule } from './user-address/user-address.module';
import { envVariables } from './config/env.variables';
import { WishlistModule } from './wishlist/wishlist.module';
import { JwtModule } from '@nestjs/jwt';

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
      logging: true, // Enable logging for debugging
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    
    ProductModule,
    
    CategoryModule,
    
    CommentModule,
    UserAddressModule,
    WishlistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
