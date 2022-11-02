import { InputType, Field, registerEnumType, Int } from '@nestjs/graphql';
export enum ORDER_STATUS {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}
registerEnumType(ORDER_STATUS, {
  name: 'ORDER_STATUS',
});

@InputType()
export class CreateOrderInput {
  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  days?: number;

  @Field({ nullable: true })
  price?: number;

  @Field(() => ORDER_STATUS, { defaultValue: ORDER_STATUS.ACTIVE })
  status: ORDER_STATUS;

  @Field(() => Int, { nullable: false })
  carId: number;
}
