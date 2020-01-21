import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accion-emisor',
  templateUrl: './accion-emisor.component.html',
  styleUrls: ['./accion-emisor.component.scss']
})
export class AccionEmisorComponent implements OnInit {

  @Input() pathLogo: string;
  @Input() nombreEmisor: string;
  @Input() precio: number;
  @Input() rendimiento: number;
  @Input() numeroRonda: number;
  @Input() esRentaFija: boolean;
  @Input() emisor: string;
  @Input() tipoRentaFija: string;

  constructor() {
  }

  ngOnInit() {
  }

}
