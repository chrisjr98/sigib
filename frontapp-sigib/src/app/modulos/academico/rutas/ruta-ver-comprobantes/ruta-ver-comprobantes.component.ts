import { Component, OnInit } from '@angular/core';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaRestService } from 'src/app/servicios/rest/servicios/materia-rest.service';
import { CarreraRestService } from 'src/app/servicios/rest/servicios/carrrera-rest.service';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ruta-ver-comprobantes',
  templateUrl: './ruta-ver-comprobantes.component.html',
  styleUrls: ['./ruta-ver-comprobantes.component.scss']
})
export class RutaVerComprobantesComponent implements OnInit {


  comprobantes: ComprobanteInterface[];

  columnas = [
    {field: 'numero', header: 'Numero', width: '10%'},
    {field: 'fecha', header: 'Fecha', width: '10%'},
    {field: 'ci', header: 'Ced Identidad', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '10%'},
    {field: 'tipo', header: 'Tipo', width: '10%'},
    {field: 'formapago', header: 'Forma de pago', width: '10%'},
    {field: 'realizadop', header: 'Realizado por', width: '20%'},
    {field: 'comprobantep', header: 'Comprobante pago', width: '10%'},
    {field: 'beneficiario', header: 'Beneficiario', width: '10%'},
    {field: 'acciones', header: 'Acciones', width: '20%'},
  ];


  constructor(
    private _activatedRoute: ActivatedRoute,
   // private readonly _materiaService: MateriaRestService,
   // private readonly _carreraService: CarreraRestService,
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,) { }

  ngOnInit() {
  }


}
