import {Component, Inject, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EmisorRestService} from '../../../servicios/rest/servicios/emisor-rest.service';
import {ToasterService} from 'angular2-toaster';
import {JuegoFormularioComponent} from '../../../formularios/juego-formulario/juego-formulario.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NUMERO_FILAS_TABLAS} from '../../../constantes/numero-filas-tablas';
import {eliminarDuplicadosDosArreglos} from '../../../funciones/eliminar-duplicados-dos-arreglos';


@Component({
  selector: 'app-seleccionar-emisores',
  templateUrl: './seleccionar-emisores.component.html',
  styleUrls: ['./seleccionar-emisores.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SeleccionarEmisoresComponent implements OnInit {

  row = NUMERO_FILAS_TABLAS;
  totalRegistros;
  descripcion;
  emisorSeleccionado;
  arregloEmisores = [];
  arregloEmisoresSeleccionados = [];
  columnas = [
    {field: 'nombre', header: 'Nombre'},
  ];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _emisorRestService: EmisorRestService,
    public dialogo: MatDialogRef<JuegoFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { arregloEmisores: any[] },
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // private readonly _cargandoService: CargandoService,

  ) {
  }

  ngOnInit() {
    this.descripcion = 'Seleccione los emisores del juego.';
    this.obtenerEmisores();
  }

  obtenerEmisores() {
    const consulta = {
      relations: ['papelesRentaFija'],
    };
    this.arregloEmisoresSeleccionados = this.data.arregloEmisores;
    this._emisorRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(
        r => {
          const existenEmisores = r[1] > 0;
          if (existenEmisores) {
            const totalEmisoresSeleccionados = this.arregloEmisoresSeleccionados.length > 0;
            if (!totalEmisoresSeleccionados) {
              this.arregloEmisores = r[0];
              this.totalRegistros = this.arregloEmisores.length;
            } else {
              this.arregloEmisores = eliminarDuplicadosDosArreglos({
                arregloUno: r[0],
                arregloDos: this.arregloEmisoresSeleccionados,
                llave: 'id',
              });
              this.totalRegistros = this.arregloEmisores.length;
            }
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  enviarEmisoresSeleccionados() {
    this.dialogo.close(this.arregloEmisoresSeleccionados);
  }

}
