import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    
    ProductModule,
    
    CategoryModule,
    
    CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
