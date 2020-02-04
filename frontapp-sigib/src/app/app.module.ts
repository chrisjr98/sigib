import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlockUIModule} from 'primeng/blockui';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {MenuOpcionesInicioModule} from './componentes/menu-opciones-inicio/menu-opciones-inicio.module';
import {HeaderModule} from './componentes/header/header.module';
import {FooterModule} from './componentes/footer/footer.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {UsuarioFormularioComponent} from './formularios/usuario-formulario/usuario-formulario.component';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {NoticiaRestService} from './servicios/rest/servicios/noticia-rest.service';
import {ConfiguracionesModule} from './modulos/configuraciones/configuraciones.module';
import {AdministradorModule} from './modulos/administrador/administrador.module';
import {JugadorGuard} from './servicios/guard/jugador.guard';
import {AdministradorGuard} from './servicios/guard/administrador.guard';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent,
    UsuarioFormularioComponent,
    AppComponent,
    RutaNoEncontradaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BlockUIModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    MenuOpcionesInicioModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    TextMaskModule,
    ConfiguracionesModule,
    AdministradorModule,
  ],
  providers: [
    NoticiaRestService,
    CookieService,
    JugadorGuard,
    AdministradorGuard,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}

