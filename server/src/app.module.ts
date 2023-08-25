import * as path from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { MaterialModule } from './material/material.module';
import { ColorModule } from './color/color.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import { OrderElementModule } from './order-element/order-element.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'dist/public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductModule,
    UserModule,
    AuthModule,
    ManufacturerModule,
    MaterialModule,
    ColorModule,
    FilesModule,
    OrderModule,
    OrderElementModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
