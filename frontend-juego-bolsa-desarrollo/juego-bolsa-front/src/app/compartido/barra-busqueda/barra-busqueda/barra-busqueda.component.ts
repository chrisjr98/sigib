import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent implements OnInit {

  @Input() placeholder = 'Ingrese su busqueda...';
  @Input() tituloBarra: string;
  @Input() small: string;
  @Input() mostrarBotonBuscar = true;
  @Output() eventoBuscar: EventEmitter<string> = new EventEmitter();
  formBusqueda: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formBusqueda = this._formBuilder.group({
      palabraBusqueda: '',
    });
    this.escucharBusqueda();
  }

  escucharBusqueda() {
    const busqueda$ = this.formBusqueda.get('palabraBusqueda');
    busqueda$.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(palabraBusqueda => {
        if (palabraBusqueda !== '') {
          if (!this.mostrarBotonBuscar) {
            this.eventoBuscar.emit(palabraBusqueda);
          }
        }
      });
  }

  buscar() {
    this.eventoBuscar.emit(this.formBusqueda.get('palabraBusqueda').value);
  }
}
