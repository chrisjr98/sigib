import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {NoticiaRestService} from '../../../../servicios/rest/servicios/noticia-rest.service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionNoticiasComponent} from '../../rutas/ruta-gestion-noticias/ruta-gestion-noticias.component';
import {NoticiaInterface} from '../../../../interfaces/interfaces/noticia.interface';
import {ESTADOS} from '../../../../constantes/estados';
import {Noticia} from '../../../../clases/noticia';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {TipoNoticiaInterface} from '../../../../interfaces/interfaces/tipo-noticia.interface';

@Component({
  selector: 'app-crer-editar-noticia',
  templateUrl: './crer-editar-noticia.component.html',
  styleUrls: ['./crer-editar-noticia.component.scss']
})
export class CrearEditarNoticiaComponent implements OnInit {
  crearEditarNoticia: NoticiaInterface;
  formularioValido;
  noticia: NoticiaInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {noticia: NoticiaInterface},
    public dialogo: MatDialogRef<RutaGestionNoticiasComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiaService: NoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(noticia) {
    if (noticia) {
      this.crearEditarNoticia = noticia;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.noticia) {
      this._noticiaService
        .updateOne(this.data.noticia.id, this.crearEditarNoticia)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.crearEditarNoticia.habilitado = this.data.noticia.habilitado;
            this.dialogo.close(this.crearEditarNoticia);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    } else {
      this.noticia = {
        nivelJuego: this.crearEditarNoticia.nivelJuego as NivelJuegoInterface,
        habilitado: 1,
        descripcion: this.crearEditarNoticia.descripcion,
        titulo: this.crearEditarNoticia.titulo,
        tipo: this.crearEditarNoticia.tipo as TipoNoticiaInterface,
      };
      this._noticiaService
        .create(this.noticia)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    }
  }

}
