import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmisorInterface} from '../../../interfaces/interfaces/emisor.interface';

@Component({
  selector: 'app-ingreso-cantidad-acciones-renta-fija',
  templateUrl: './ingreso-cantidad-acciones-renta-fija.component.html',
  styleUrls: ['./ingreso-cantidad-acciones-renta-fija.component.scss']
})
export class IngresoCantidadAccionesRentaFijaComponent implements OnInit {
  @Input() precio: number;
  @Input() rendimiento: number;
  @Input() numeroRonda: number;
  @Input() esRentaFija;
  @Input() emisor: any;
  @Output() enviarValorComprar: EventEmitter<number | any> = new EventEmitter<number | any>();
  @Output() enviarValorVende: EventEmitter<number | any> = new EventEmitter<number | any>();

  constructor() {
  }

  ngOnInit() {
  }

  seteoValorCompra(evento) {
    this.enviarValorComprar.emit(evento);
  }

  seteoValorVende(evento) {
    this.enviarValorVende.emit(evento);
  }
}
