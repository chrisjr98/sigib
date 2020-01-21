import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionNoticiasComponent} from '../../rutas/ruta-gestion-noticias/ruta-gestion-noticias.component';
import {NoticiaEmisorRestService} from '../../../../servicios/rest/servicios/noticia-emisor-rest.service';
import {NoticiaEmisorInterface} from '../../../../interfaces/interfaces/noticia-emisor.interface';
import {ESTADOS} from '../../../../constantes/estados';
import {toastErrorCrear, toastExitoCrear} from '../../../../constantes/mensajes-toaster';
import {NoticiaRestService} from '../../../../servicios/rest/servicios/noticia-rest.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {eliminarDuplicadosDosArreglos} from '../../../../funciones/eliminar-duplicados-dos-arreglos';
import {RutaGestionNoticiasEmisorComponent} from '../../rutas/ruta-gestion-noticias-emisor/ruta-gestion-noticias-emisor.component';
import {TipoNoticias} from '../../../../enums/tipo-noticias';


@Component({
  selector: 'app-asignar-noticias-emisor',
  templateUrl: './asignar-noticias-emisor.component.html',
  styleUrls: ['./asignar-noticias-emisor.component.scss'],
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
export class AsignarNoticiasEmisorComponent implements OnInit {


  crearNoticiaEmisor: any = [];
  descripcion;
  noticias;
  arregloNoticias = [];
  arregloNoticiasSeleccionados = [];
  totalRegistros;
  registrosCreados = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<RutaGestionNoticiasEmisorComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiasEmisorService: NoticiaEmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiasService: NoticiaRestService,

  ) { }

  ngOnInit() {
    this.descripcion = 'Seleccione las noticias del emisor';
    this.obtenerNoticias();
  }


  obtenerNoticias() {
    this.arregloNoticiasSeleccionados = this.arregloNoticias;
    this._noticiasEmisorService.obtenerAsignacionNoticias({idEmisor: this.data.emisor}).subscribe(
      r => {
        const existenNoticias = r[1] > 0;
        if (existenNoticias) {
          const totalNoticiasSeleccionados = this.arregloNoticiasSeleccionados.length > 0;
          if (!totalNoticiasSeleccionados) {
            this.arregloNoticias = r[0];
            this.totalRegistros = this.arregloNoticias.length;
          } else {
            this.arregloNoticias = eliminarDuplicadosDosArreglos({
              arregloUno: r[0],
              arregloDos: this.arregloNoticiasSeleccionados,
              llave: 'id',
            });
            this.totalRegistros = this.arregloNoticias.length;
          }
        }
      }
    );
  }


  metodoCrearNoticiaEmisor() {
//    this._cargandoService.habilitarCargando();
    if (this.data.emisor) {
      const arregloNoticiasEmisorCrear = this.arregloNoticiasSeleccionados
        .map(respuesta => {
          const tipoNoticia = respuesta.tipo.id;
          const noticiaEmisor = {
            emisor: this.data.emisor,
            esPositiva: tipoNoticia === TipoNoticias.CONTRASPLIT ? ESTADOS.Negativa : ESTADOS.Positiva,
            habilitado: ESTADOS.Activo,
            noticia: respuesta.id,
          };
          return noticiaEmisor;
        });

      for (const noti of arregloNoticiasEmisorCrear) {
        this._noticiasEmisorService.create(noti).subscribe(r => {
          const consulta = {
            where: {
              id: r.id
            },
            relations: [
              'noticia', 'noticia.tipo', 'noticia.nivelJuego'
            ]
          };

          this._noticiasEmisorService.findAll(JSON.stringify(consulta)).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            r => {
              this.registrosCreados.push(r[0][0]);
              if (this.registrosCreados.length === arregloNoticiasEmisorCrear.length) {
                this._toasterService.pop(toastExitoCrear);
                this.dialogo.close(this.registrosCreados);
              }
            },
          );
        },  error => {
            this._cargandoService.deshabilitarCargando();
            // tslint:disable-next-line:max-line-length
            this._toasterService.pop(toastErrorCrear);
          }
        );
      }
    }
  }



}
