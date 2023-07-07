import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeportistaInput, UpdateDeportistaInput } from './dto/inputs';
import { Deportista } from './entities/deportista.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeportistasService {

  constructor( 
    @InjectRepository(Deportista)
    private readonly deportistasRepository:Repository<Deportista> ){}

  async create(createDeportistaInput: CreateDeportistaInput): Promise<Deportista>  {
    const newDeportista= this.deportistasRepository.create(createDeportistaInput);
    return await this.deportistasRepository.save(newDeportista); 
  }

  async findAll(): Promise<Deportista[]> {
    return this.deportistasRepository.find();
  }

  async findOne(id: string): Promise<Deportista> {
     const deportista= await  this.deportistasRepository.findOneBy({id});
     if (!deportista) throw new NotFoundException(`Not found`)
     return deportista;
  }

  async update(id: string, updateDeportistaInput: UpdateDeportistaInput): Promise<Deportista> {
    
    const deportista = await this.deportistasRepository.preload(updateDeportistaInput);
    if (!deportista) throw new NotFoundException(`Not found`)
    return this.deportistasRepository.save(deportista);

  }

  async remove(id: string): Promise<Deportista> {

    const deportista= await  this.findOne(id);

    await this.deportistasRepository.update({id:id},{estado:false  });
    
    // await this.deportistasRepository.remove(deportista);

    return {...deportista, id};

  }
}
