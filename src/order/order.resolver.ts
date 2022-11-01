import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order, { name: 'bookCar' })
  bookCar(
    @Args('carId', { type: () => Int }) carId: number,
    @Args('day', { type: () => Int }) day: number,
  ) {
    return this.orderService.bookACar(carId, day);
  }

  @Query(() => [Order], { name: 'getAllOrders' })
  getAllOrder() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'getOrder' })
  getOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }
}
