import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
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

    @Get('crear-reporte-contactos-empresa')
    async buscarAreas(@Query('consulta') consulta) {
        try {
            return await this._estudianteService.crearReportePdf(
                consulta,
            );
        } catch (e) {
            console.error(
                {
                    error: e,
                    mensaje: 'Error con el servidor',
                },
            );
            throw new BadRequestException(
                {
                    mensaje: 'Error con el servidor',
                },
            );
        }
    }
}
