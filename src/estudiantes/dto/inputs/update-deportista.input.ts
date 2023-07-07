import { IsUUID } from 'class-validator';
import { CreateDeportistaInput } from './create-deportista.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDeportistaInput extends PartialType(CreateDeportistaInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
