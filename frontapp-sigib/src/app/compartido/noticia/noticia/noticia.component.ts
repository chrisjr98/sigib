import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {

  @Input() titulo: string;
  @Input() descripcion: string;
  @Input() esPositiva: boolean;

  noticiaEsPositiva: string;

  constructor() { }

  ngOnInit() {
    this.tipoNoticia();
  }

  tipoNoticia() {
    if (this.esPositiva) {
      this.noticiaEsPositiva = 'bg-success';
    } else {
      this.noticiaEsPositiva = 'bg-danger';
    }
  }

}
