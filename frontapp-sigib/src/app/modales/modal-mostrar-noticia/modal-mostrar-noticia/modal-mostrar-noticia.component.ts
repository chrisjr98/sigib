import {Component, Inject, OnInit} from '@angular/core';
import {NoticiaCardInterface} from '../../../interfaces/interfaces/noticia-card.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import {TipoNoticiaRestService} from '../../../servicios/rest/servicios/tipo-noticia-rest.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-modal-mostrar-noticia',
  templateUrl: './modal-mostrar-noticia.component.html',
  styleUrls: ['./modal-mostrar-noticia.component.scss']
})
export class ModalMostrarNoticiaComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<ModalMostrarNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {noticias: NoticiaCardInterface[]},
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
  }

}
