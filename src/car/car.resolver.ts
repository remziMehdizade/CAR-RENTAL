import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './entities/car.entity';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Mutation(() => Car)
  createCar(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carService.create(createCarInput);
  }

  @Query(() => [Car])
  getAllCars() {
    return this.carService.findAll();
  }

  @Query(() => [Car], { name: 'getAllAvailableCars' })
  getAllAvailableCars() {
    return this.carService.getAllAvailableCars();
  }

  @Query(() => Car, { name: 'getCar' })
  getCar(@Args('id', { type: () => Int }) id: number) {
    return this.carService.findOne(id);
  }

  @Mutation(() => Car, { name: 'updateCar' })
  updateCar(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCarInput') updateCarInput: UpdateCarInput,
  ) {
    return this.carService.update(id, updateCarInput);
  }

  @Mutation(() => String)
  deleteCar(@Args('id', { type: () => Int }) id: number) {
    return this.carService.deleteCar(id);
  }
}
