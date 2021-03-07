import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrincipalService } from 'src/principal/principal.service';
import { RolEntity } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class RolService extends PrincipalService<RolEntity> {
  constructor(
    @InjectRepository(RolEntity)
      _rolRepository: Repository<RolEntity>,
  ) {
    super(_rolRepository, RolEntity);
  }
}
