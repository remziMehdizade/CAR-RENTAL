import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Car } from 'src/car/entities/car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../dto/create-order.input';

@ObjectType()
@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  createdDate: Date;

  @Column({ type: 'timestamp without time zone', nullable: true, precision: 6 })
  @Field({ nullable: true })
  endDate?: Date;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: false })
  days: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  @Field(() => Float, { nullable: false })
  price: number;

  @Column()
  @Field(() => ORDER_STATUS)
  status: ORDER_STATUS;

  @ManyToOne(() => Car, (car) => car.id, {
    cascade: ['insert', 'remove'],
  })
  @JoinColumn()
  @Field(() => Car, { nullable: false })
  car: Car;
}
