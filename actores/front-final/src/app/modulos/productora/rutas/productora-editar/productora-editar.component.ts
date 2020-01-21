import { Component, OnInit } from '@angular/core';
import { ProductoraInterface } from '../../interfaces/productora.interface';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar, toastWarningFoto, toastFoto } from 'src/app/shared/toaster';
import { MatDialog } from '@angular/material';
import { SubirArchivoComponent } from 'src/app/modulos/material/subir-archivo/subir-archivo.component';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-productora-editar',
  templateUrl: './productora-editar.component.html',
  styleUrls: ['./productora-editar.component.css'],
  // entryComponents: [ SubirArchivoComponent]
})
export class ProductoraEditarComponent implements OnInit {
  productoraEditar: ProductoraInterface;

  botonEditarDisable = true;

  productora: ProductoraInterface;

  mensajesErrorId: string[];

  mensajesErrorFile: string[];

  enableCambiarImg = false;

  subir = false;

  constructor(private readonly _productoraService: ProductoraService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _toastService: ToasterService,
              public dialog: MatDialog,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idProductora = parametrosRuta.get('id');
      this._productoraService.obtenerUno(+idProductora).subscribe((productoraResultado: any) => {
        this.productora = productoraResultado.data.encontrarUnaProductora;
      }, (error) => {
        console.error('error obteniendo la productora', error);
      });
    });
  }

  editar() {
    this._productoraService.editar(+this.productora.id, this.productoraEditar)
      .subscribe((resultado) => {
        console.log(this.productora.id);
        console.log('se creo exitosamente', resultado);
        this._toastService.pop(toastEditar);
        this._router.navigate(['/aplicacion', 'productora', 'listar', {resaltado: this.productora.id}]);
      }, (error) => {
        console.log('error creando :(', error);
        this._toastService.pop(toastErrorEditar);
      });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'productora', 'listar', {resaltado: this.productora.id}]);
  }

  formularioEsValido(productora: ProductoraInterface) {

    const seEdito = productora.propietario !== this.productora.propietario
                    && productora;
    if (seEdito) {
      this.botonEditarDisable = false;
      this.productoraEditar = productora;
    } else {
      this.botonEditarDisable = true;
    }
  }

  abrirDialogoArchivo() {
    const dialogRef = this.dialog.open(SubirArchivoComponent, {
      width: '450px',
      height: '250px',
      data: {
        url: environment.urlBackEnd + '/subirFotoProductora?id=' + this.productora.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.editado) {
        this._toastService.pop(toastFoto);
      } else {
        this._toastService.pop(toastWarningFoto);
      }
    });
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Esta seguro de editar este elemento?',
        accept: () => {
            this.editar();
        }
    });
}
}
