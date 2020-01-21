import { Component, OnInit } from '@angular/core';
import { ProductoraInterface } from '../../interfaces/productora.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoraService } from 'src/app/servicios/productora.service';

@Component({
  selector: 'app-productora-detalle',
  templateUrl: './productora-detalle.component.html',
  styleUrls: ['./productora-detalle.component.css']
})
export class ProductoraDetalleComponent implements OnInit {

  productora: ProductoraInterface;

  constructor(private readonly _productoraService: ProductoraService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idProductora = parametrosRuta.get('id');
      this._productoraService.obtenerUno(+idProductora).subscribe((resultado: any) => {
        this.productora = resultado.data.encontrarUnaProductora;
        console.log(this.productora);
      }, (error) => {
        console.error('error obteniendo la productora', error);
      });
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'productora', 'listar', {resaltado: this.productora.id}]);
  }

}
