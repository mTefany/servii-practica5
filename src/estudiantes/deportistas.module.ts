import { Module } from '@nestjs/common';
import { DeportistasService } from './deportistas.service';
import { DeportistasResolver } from './deportistas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deportista } from './entities/deportista.entity';

@Module({
  providers: [DeportistasResolver, DeportistasService],
  imports:[
    TypeOrmModule.forFeature([Deportista])
  ]
})
export class DeportistasModule {}
