import { Injectable } from "@nestjs/common";
import { PrincipalService } from "../principal/principal.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GradoEntity } from "./grado.entity";

@Injectable()
export class GradoService extends PrincipalService<GradoEntity> {
    constructor(
        @InjectRepository(GradoEntity)
        _gradoRepository: // tslint:disable-next-line:variable-name
        Repository<GradoEntity>
    ) {
        super(_gradoRepository, GradoEntity);
    }
}
