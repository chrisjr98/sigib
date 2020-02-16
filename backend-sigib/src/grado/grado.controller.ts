import { Controller } from "@nestjs/common";
import { PrincipalAbstractController } from "../principal/principal-abstract-controller";
import { GradoService } from "./grado.service";
import { GradoEntity } from "./grado.entity";

@Controller("grado")
export class GradoController extends PrincipalAbstractController<GradoEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _gradoService: GradoService) {
        super(_gradoService);
    }
}
