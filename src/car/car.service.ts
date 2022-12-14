import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  async create(createCarInput: CreateCarInput) {
    const car = await this.carRepository.create(createCarInput);
    return this.carRepository.save(car);
  }

  async findAll() {
    return await this.carRepository.find();
  }

  async getAllAvailableCars() {
    //return await this.carRepository.find();

    const order =  this.orderRepository
      .createQueryBuilder('order')
      .distinctOn(['order.carId'])
      .select(['order.carId'])
      .where('order.endDate >now()');

    const car = await this.carRepository
      .createQueryBuilder('car')
      .where('car.id NOT IN (' + order.getQuery() + ')')
      .setParameter('registered', true)
      .getMany();

    return car;
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });

    if (!car) {
      throw new NotFoundException('Car Not Found !');
    }

    return car;
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    const car = await this.findOne(id);

    if (!car) {
      throw new NotFoundException('Car Not Found !');
    }
    const { brand, model, year, category, pricePerDay } = updateCarInput;

    this.carRepository.merge(car, {
      brand,
      model,
      year,
      category,
      pricePerDay,
    });
    return await this.carRepository.save(car);
  }

  async deleteCar(id: number) {
    const car = await this.findOne(id);

    if (!car) {
      throw new NotFoundException('Car Not Found !');
    }

    await this.carRepository.delete(car.id);

    return 'This Id: ${id} car was deleted';
  }
}
