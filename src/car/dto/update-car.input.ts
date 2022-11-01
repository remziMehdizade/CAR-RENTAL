import { Category, CreateCarInput, STATUS } from './create-car.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field({ nullable: true })
  brand?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  year?: number;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field({ nullable: true })
  pricePerDay?: number;

  @Field(() => STATUS, { nullable: true })
  status?: STATUS;
}
