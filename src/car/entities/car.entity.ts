import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category, STATUS } from '../dto/create-car.input';

@ObjectType()
@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  @Field({ nullable: false })
  brand: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  @Field({ nullable: false })
  model: string;

  @Column({ type: 'int', nullable: false })
  @Field({ nullable: false })
  year: number;

  @Column()
  @Field(() => Category)
  category: Category;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  @Field({ nullable: false })
  pricePerDay: number;

  @Column()
  @Field(() => STATUS)
  status: STATUS;

  // @OneToMany(() => Order, (order) => order.car, {
  //   nullable: true,
  // })
  // @Field(() => [Order], { nullable: true })
  // order!: Order[];
}
