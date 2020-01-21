import {Component, Input, OnInit} from '@angular/core';
import {NoticiaInterface} from '../../../interfaces/interfaces/noticia.interface';

@Component({
  selector: 'app-mostrar-noticias',
  templateUrl: './mostrar-noticias.component.html',
  styleUrls: ['./mostrar-noticias.component.scss']
})
export class MostrarNoticiasComponent implements OnInit {

  @Input() noticias;

  constructor() { }

  ngOnInit() {
  }

}
