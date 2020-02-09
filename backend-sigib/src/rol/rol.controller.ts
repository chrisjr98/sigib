import { Controller } from '@nestjs/common';
import { PrincipalAbstractController } from 'src/principal/principal-abstract-controller';
import { RolEntity } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController extends PrincipalAbstractController<
  RolEntity
> {
  constructor(private readonly _rolService: RolService) {
    super(_rolService);
  }
}
