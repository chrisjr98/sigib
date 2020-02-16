import { Controller } from "@nestjs/common";
import { PrincipalAbstractController } from "../principal/principal-abstract-controller";
import { EstudianteService } from "./estudiante.service";
import { EstudianteEntity } from "./estudiante.entity";

@Controller("estudiante")
export class EstudianteController extends PrincipalAbstractController<
    EstudianteEntity
> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _estudianteService: EstudianteService) {
        super(_estudianteService);
    }
}
