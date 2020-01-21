import { Component, OnInit } from '@angular/core';
import { ProductoraInterface } from '../../interfaces/productora.interface';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastCrear, toastErrorCrear } from 'src/app/shared/toaster';

@Component({
  selector: 'app-productora-crear',
  templateUrl: './productora-crear.component.html',
  styleUrls: ['./productora-crear.component.css']
})
export class ProductoraCrearComponent implements OnInit {

  productoraCrear: ProductoraInterface;

  crearDisable = true;

  constructor(private readonly _productoraService: ProductoraService,
              private readonly _router: Router,
              private  readonly _toastService: ToasterService) { }

  ngOnInit() {
  }

  crear() {
    this._productoraService.crear(this.productoraCrear).subscribe((resultado: any) => {
      console.log('se creo exitosamente', resultado);
      this._toastService.pop(toastCrear);
      this._router.navigate(['/aplicacion', 'productora', 'listar', {resaltado: resultado.id}]);
    }, (error) => {
      console.log('error creando :(', error);
      this._toastService.pop(toastErrorCrear);
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'productora', 'listar']);
  }

  formularioEsValido(productora: ProductoraInterface) {
    if (productora) {
      this.productoraCrear = productora;
      this.crearDisable = false;
    } else {
      this.crearDisable = true;
    }
  }


}
