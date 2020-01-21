import { Component, OnInit } from '@angular/core';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { ProductoraInterface } from '../../interfaces/productora.interface';
import { ActivatedRoute } from '@angular/router';
import { LIMITE_PAGINACION } from '../../../../constantes/paginacion';

@Component({
  selector: 'app-productora-listar',
  templateUrl: './productora-listar.component.html',
  styleUrls: ['./productora-listar.component.css']
})
export class ProductoraListarComponent implements OnInit {

  productoras: ProductoraInterface[] = [];

  patron = '';

  totalProductoras: number;

  elementoResaltado: number;

  emptyMessage = 'No hay productoras para mostrar';

  limite = LIMITE_PAGINACION;


  constructor(private readonly _productoraService: ProductoraService,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerResaltadoYProductoras();
  }


  buscar(skip: number) {
    this._productoraService.contarBuscados(this.patron)
    .subscribe((resultado: any) => {
      this.totalProductoras = resultado.data.contarProductorasBuscadas ;

      this._productoraService.buscar(this.patron, skip, this.limite).subscribe((productoras: any) => {
        this.productoras = productoras.data.buscarProductora;
      }, (error) => {
        console.log('error buscando productoras', error);
      });
    }, (error) => {
      console.log('error cargando productoras', error);
    });
  }

  obtenerResaltadoYProductoras() {
    const $obtenerParametros = this._activatedRoute.paramMap;
    $obtenerParametros.subscribe((parametros) => {
      this.elementoResaltado = +parametros.get('resaltado');
      this.buscar(0);
    });
  }

  loadData(event) {
    this.buscar(event.first);
  }
}
