import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/car/entities/car.entity';
import { Repository } from 'typeorm';
import { ORDER_STATUS } from './dto/create-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
  ) {}

  async bookACar(id, day) {
    const order = new Order();

    const car = await this.carRepository.findOne({
      where: { id },
    });
    if (!car) {
      throw new NotFoundException(' Car Not Found');
    } else {
      order.car = car;
      const endDay = new Date();
      endDay.setDate(endDay.getDate() + day);
      order.endDate = endDay;
      order.days = day;
      order.status = ORDER_STATUS.ACTIVE;
      order.price = car.pricePerDay * day;
    }

    const saveOrder = this.orderRepository.create(order);

    return await this.orderRepository.save(saveOrder);
  }

  async findAll() {
    // return await this.orderRepository.find({ relations: ['car'] });

    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.car', 'car')
      .where('order.endDate >:date', { date: new Date() })
      .getMany();

    return order;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['car'],
    });
    if (!order) {
      throw new NotFoundException('Order Not Found!');
    }
    return order;
  }
}
