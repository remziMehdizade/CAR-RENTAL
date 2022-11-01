import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CarService } from 'src/car/car.service';
import { Car } from 'src/car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Car])],
  providers: [OrderResolver, OrderService, CarService],
})
export class OrderModule {}
