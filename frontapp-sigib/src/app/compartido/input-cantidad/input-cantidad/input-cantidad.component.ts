import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MASK_NUMEROS_ENTEROS} from '../../../constantes/mascaras';

@Component({
  selector: 'app-input-cantidad',
  templateUrl: './input-cantidad.component.html',
  styleUrls: ['./input-cantidad.component.scss']
})
export class InputCantidadComponent implements OnInit {
  mascaraNumeroEntero = MASK_NUMEROS_ENTEROS;
  @Input() esRentaFija = true;
  @Output() enviarValorComprar: EventEmitter<number | any> = new EventEmitter<number | any>();
  @Output() enviarValorVende: EventEmitter<number | any> = new EventEmitter<number | any>();
  @Input() idEmisor: number;
  cantidadCompra: any;
  cantidadVende: any;

  constructor() {
  }

  ngOnInit() {
  }

  escuharCantidadComprar() {
    if (this.cantidadVende) {
      this.cantidadVende = null;
    } else {
      this.cantidadCompra = +this.cantidadCompra;
      this.enviarValorComprar.emit(this.cantidadCompra);
    }

  }

  escuharCantidadVenta() {
    if (this.cantidadCompra) {
      this.cantidadCompra = null;
    } else {
      this.cantidadVende = +this.cantidadVende;
      this.enviarValorVende.emit(this.cantidadVende);
    }

  }
}
