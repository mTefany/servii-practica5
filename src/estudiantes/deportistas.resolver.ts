import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { DeportistasService } from './deportistas.service';
import { Deportista } from './entities/deportista.entity';
import { UpdateDeportistaInput, CreateDeportistaInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Deportista)
export class DeportistasResolver {
  constructor(private readonly deportistasService: DeportistasService) {}

  @Mutation(() => Deportista)
  async createDeportista(@Args('createDeportistaInput') createDeportistaInput: CreateDeportistaInput)
  :Promise<Deportista> {
    return this.deportistasService.create(createDeportistaInput);
  }

  @Query(() => [Deportista], { name: 'deportistas' })
  async findAll():Promise<Deportista[]> {
    return this.deportistasService.findAll();
  }

  @Query(() => Deportista, { name: 'deportistas' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Deportista> {
    return this.deportistasService.findOne(id);
  }

  @Mutation(() => Deportista)
  updateDeportista(@Args('updateDeportistaInput') updateDeportistaInput: UpdateDeportistaInput): Promise<Deportista> {
    return this.deportistasService.update(updateDeportistaInput.id, updateDeportistaInput);
  }

  @Mutation(() => Deportista)
  removeDeportista(@Args('id', { type: () => ID }) id: string): Promise<Deportista> {
    return this.deportistasService.remove(id);
  }
}
