import { Component, OnInit, Input } from '@angular/core';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';
import { ProductoraInterface } from '../../interfaces/productora.interface';

@Component({
  selector: 'app-productora-resumido',
  templateUrl: './productora-resumido.component.html',
  styleUrls: ['./productora-resumido.component.css']
})
export class ProductoraResumidoComponent implements OnInit {

  @Input() productora: ProductoraInterface;

  constructor(private readonly _productoraService: ProductoraService,
              private readonly _toastService: ToasterService) { }

  ngOnInit() {
    // this.productora = {
    //   nombre: 'alguna',
    //   activo: false,
    //   id: 1,
    //   fechaFundacion: '2011-05-06',
    //   fundador: 'kersha',
    //   propietario: 'carlos',
    //   pais: 'Ecuador',
    //   rutaImagen: 'http://www.paramount.com/sites/all/modules/custom/pmount_grid/images/paramount-logo-grid-new.png'
    // };
    
  }

  activarDesactivar(id: number) {
    this._productoraService.activarDesactivar(+id)
    .subscribe((resultado: any) => {
      this.productora.activo = resultado.data.activarDesactivarProductora.activo;
      this._toastService.pop(toastEditar);
    },
    (error) => {
      console.log(error);
      this._toastService.pop(toastErrorEditar);
    });
  }

}
