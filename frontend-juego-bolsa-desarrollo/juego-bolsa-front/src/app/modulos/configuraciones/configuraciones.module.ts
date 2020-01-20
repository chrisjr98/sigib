import {NgModule} from '@angular/core';
import {RutaGestionRentaFijaComponent} from './rutas/ruta-gestion-renta-fija/ruta-gestion-renta-fija.component';
import {RentaFijaFormularioComponent} from './formularios/renta-fija-formulario/renta-fija-formulario.component';
import {CrearEditarRentaFijaComponent} from './modales/crear-editar-renta-fija/crear-editar-renta-fija.component';
import {CommonModule} from '@angular/common';
import {RutaGestionNoticiasComponent} from './rutas/ruta-gestion-noticias/ruta-gestion-noticias.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TextMaskModule} from 'angular2-text-mask';
import {ConfiguracionesRoutingModule} from './configuraciones-routing.module';
import {RutaGestionEmisoresComponent} from './rutas/ruta-gestion-emisores/ruta-gestion-emisores.component';
import {CrearEditarEmisoresComponent} from './modales/crear-editar-emisores/crear-editar-emisores.component';
import {EmisorFormularioComponent} from './formularios/emisor-formulario/emisor-formulario.component';
import {FormularioNoticiaComponent} from './formularios/formulario-noticia/formulario-noticia.component';
import {DropdownModule} from 'primeng/dropdown';
import {CrearEditarNoticiaComponent} from './modales/crear-editar-noticia/crer-editar-noticia.component';
import {RutaRangoValoresComponent} from './rutas/ruta-rango-valores/ruta-rango-valores.component';
import {RutaGestionNivelComponent} from './rutas/ruta-gestion-nivel/ruta-gestion-nivel.component';
import {CrearEditarNivelComponent} from './modales/crear-editar-nivel/crear-editar-nivel.component';
import {NivelFormularioComponent} from './formularios/nivel-formulario/nivel-formulario.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectGeneralModule} from '../../compartido/select-general/select-general.module';
import {TableModule} from 'primeng/table';
import { RutaGestionNoticiasEmisorComponent } from './rutas/ruta-gestion-noticias-emisor/ruta-gestion-noticias-emisor.component';
import {MenuAjustesModule} from '../../componentes/menu-ajustes/menu-ajustes.module';
import {RangosValorFormularioComponent} from './formularios/rangos-valor-formulario/rangos-valor-formulario.component';
import {CrearEditarRangosValorComponent} from './modales/crear-editar-rangos-valor/crear-editar-rangos-valor.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {BarraBusquedaModule} from '../../compartido/barra-busqueda/barra-busqueda.module';
import { RentaFijaEmisorFormularioComponent } from './formularios/renta-fija-emisor-formulario/renta-fija-emisor-formulario.component';
import { CrearEditarRentaFijaEmisorComponent } from './modales/crear-editar-renta-fija-emisor/crear-editar-renta-fija-emisor.component';
import { RutaGestionRentaFijaEmisorComponent } from './rutas/ruta-gestion-renta-fija-emisor/ruta-gestion-renta-fija-emisor.component';
import {RegistrarJugadasModule} from '../../modales/registrar-jugadas/registrar-jugadas.module';
import { AsignarNoticiasEmisorComponent } from './modales/asignar-noticias-emisor/asignar-noticias-emisor.component';
import {PickListModule} from 'primeng/picklist';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    RutaGestionRentaFijaComponent,
    RentaFijaFormularioComponent,
    CrearEditarRentaFijaComponent,
    RutaGestionNoticiasComponent,
    RutaGestionEmisoresComponent,
    CrearEditarEmisoresComponent,
    EmisorFormularioComponent,
    FormularioNoticiaComponent,
    RutaGestionNoticiasEmisorComponent,
    CrearEditarNoticiaComponent,
    RutaGestionNivelComponent,
    CrearEditarNivelComponent,
    NivelFormularioComponent,
    RutaRangoValoresComponent,
    CrearEditarRangosValorComponent,
    RangosValorFormularioComponent,
    RutaGestionNoticiasEmisorComponent,
    RentaFijaEmisorFormularioComponent,
    CrearEditarRentaFijaEmisorComponent,
    RutaGestionRentaFijaEmisorComponent,
    AsignarNoticiasEmisorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    ConfiguracionesRoutingModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    BarraBusquedaModule,
    MatOptionModule,
    MenuAjustesModule,
    RegistrarJugadasModule,
    PickListModule,
    MatButtonModule,
  ],
  entryComponents: [
    CrearEditarRentaFijaComponent,
    CrearEditarEmisoresComponent,
    CrearEditarNoticiaComponent,
    CrearEditarNivelComponent,
    CrearEditarRangosValorComponent,
    CrearEditarRentaFijaEmisorComponent,
    AsignarNoticiasEmisorComponent,
  ]
})
export class ConfiguracionesModule {
}
