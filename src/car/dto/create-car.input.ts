import { InputType, Field, registerEnumType } from '@nestjs/graphql';

export enum Category {
  SEDAN = 'sedan',
  COUPE = 'coupe',
  SUV = 'suv',
}
registerEnumType(Category, {
  name: 'Category',
});
export enum STATUS {
  AVAILABLE = 'available ',
  UNAVAILABLE = 'unavailable',
}
registerEnumType(STATUS, {
  name: 'STATUS',
});
@InputType()
export class CreateCarInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  year: number;

  @Field(() => Category)
  category: Category;

  @Field()
  pricePerDay: number;

  @Field(() => STATUS, { defaultValue: STATUS.AVAILABLE })
  status: STATUS;
}
