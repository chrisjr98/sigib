import {Component, Inject, OnInit} from '@angular/core';
import {TipoNoticiaInterface} from '../../../interfaces/interfaces/tipo-noticia.interface';
import {ToasterService} from 'angular2-toaster';
import {TipoNoticiaRestService} from '../../../servicios/rest/servicios/tipo-noticia-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';

@Component({
  selector: 'app-opciones-ronda',
  templateUrl: './opciones-ronda.component.html',
  styleUrls: ['./opciones-ronda.component.scss']
})
export class OpcionesRondaComponent implements OnInit {

  tiposNoticias: TipoNoticiaInterface[] = [];
  constructor(
    public dialogo: MatDialogRef<OpcionesRondaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {juego: JuegoInterface},

    // tslint:disable-next-line:variable-name
    private readonly _tiposNoticiasRestService: TipoNoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
    const consultaTipoNiticias = {
      where: {
        habilitado: 1,
      }
    };
    this._tiposNoticiasRestService.findAll(JSON.stringify(consultaTipoNiticias))
      .subscribe( (respuesta: [TipoNoticiaInterface[], number]) => {
        this.tiposNoticias = respuesta[0].filter(tipoNoticia => {
          if (tipoNoticia.id === 1) {
            tipoNoticia.bloquearBoton = this.data.juego.boomJugado;
          }
          if (tipoNoticia.id === 2) {
            tipoNoticia.bloquearBoton = this.data.juego.crushJugado;
          }
          if (tipoNoticia.id === 3) {
            tipoNoticia.bloquearBoton = this.data.juego.splitJugado;
          }
          if (tipoNoticia.id === 4) {
            tipoNoticia.bloquearBoton = this.data.juego.contraSplitJugado;
          }
          return tipoNoticia.id !== 5;
        });
      }, error => {
      this._toasterService.pop('error', 'Error', 'Error al cargar tipos de noticias');
      });

  }
  emitirOpcion(tipoNoticia?) {
    this.dialogo.close(tipoNoticia);
  }
}
