import { Component, OnInit, Inject } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { RutaGestionCursosComponent } from "../../rutas/ruta-gestion-cursos/ruta-gestion-cursos.component";
import { CursoRestService } from "src/app/servicios/rest/servicios/curso-rest.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { toastErrorEditar } from 'src/app/constantes/mensajes-toaster';

@Component({
  selector: "app-crear-editar-curso",
  templateUrl: "./crear-editar-curso.component.html",
  styleUrls: ["./crear-editar-curso.component.scss"]
})
export class CrearEditarCursoComponent implements OnInit {
  crearEditarCurso: CursoInterface;
  formularioValido;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { curso: CursoInterface },
    public dialogo: MatDialogRef<RutaGestionCursosComponent>,
    private readonly _cargandoService: CargandoService,
    private readonly _cursoService: CursoRestService,
    private readonly _toasterService: ToasterService
  ) {}

  ngOnInit() {}

  validarFormulario(curso) {
    if (curso) {
      this.crearEditarCurso = {
        codigo: curso.codigo,
        horario: curso.horario,
        aula: curso.aula,
        numeroMaximoAlumnos: curso.numeroMaximoAlumnos,
        profesor: curso.profesor,
        materia: curso.materia
      };
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.curso) {
      this._cursoService
        .updateOne(this.data.curso.id, this.crearEditarCurso)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            const consulta = {
              where: {
                id: this.data.curso.id
              }
            };
            this._cursoService
              .findAll(JSON.stringify(consulta))
              .subscribe(res => {
                const primerElemento = res[0][0];
                this.dialogo.close(primerElemento);
              });
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          }
        );
    } else {
      this.crearEditarCurso.profesor = 1;
      this.crearEditarCurso.materia = 1;
      this.crearEditarCurso.codigo = 1;
      this._cursoService.create(this.crearEditarCurso).subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this.dialogo.close(r);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
        }
      );
    }
  }
}
