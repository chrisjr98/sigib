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
import {ListarJugadoresModule} from './componentes/listar-jugadores/listar-jugadores.module';
import {MostrarNoticiasModule} from './componentes/mostrar-noticias/mostrar-noticias.module';
import {AccionesEmisorRondaModule} from './componentes/acciones-emisor-ronda/acciones-emisor-ronda.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {JuegoModule} from './compartido/juego/juego.module';
import {GraficoAccionesModule} from './compartido/grafico-acciones/grafico-acciones.module';
import {InputCantidadModule} from './compartido/input-cantidad/input-cantidad.module';
import {TextMaskModule} from 'angular2-text-mask';
import {ListaJuegosModule} from './componentes/lista-juegos/lista-juegos.module';
import {NoticiaFormularioComponent} from './formularios/noticia-formulario/noticia-formulario.component';
import {ParticipanteRestService} from './servicios/rest/servicios/participante-rest.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ComprarAccionesRetaFijaModule} from './componentes/comprar-acciones-reta-fija/comprar-acciones-reta-fija.module';
import {AccionesEmisorRondaRestService} from './servicios/rest/servicios/acciones-emisor-ronda-rest.service';
import {AccionesParticipanteRestService} from './servicios/rest/servicios/acciones-participante-rest.service';
import {ArchivoEmisorRestService} from './servicios/rest/servicios/archivo-emisor-rest.service';
import {ArchivoRestService} from './servicios/rest/servicios/archivo-rest.service';
import {ConfiguracionesRestService} from './servicios/rest/servicios/configuraciones-rest.service';
import {EmisorJuegoRestService} from './servicios/rest/servicios/emisor-juego-rest.service';
import {EmisorRestService} from './servicios/rest/servicios/emisor-rest.service';
import {JuegoRestService} from './servicios/rest/servicios/juego-rest.service';
import {JugadaParticipanteRestService} from './servicios/rest/servicios/jugada-participante-rest.service';
import {NivelJuegoRestService} from './servicios/rest/servicios/nivel-juego-rest.service';
import {NoticiaRestService} from './servicios/rest/servicios/noticia-rest.service';
import {NoticiasRondaRestService} from './servicios/rest/servicios/noticias-ronda-rest.service';
import {ParticipanteJuegoRestService} from './servicios/rest/servicios/participante-juego-rest.service';
import {RentaFijaRestService} from './servicios/rest/servicios/renta-fija-rest.service';
import {RondaRestService} from './servicios/rest/servicios/ronda-rest.service';
import {TipoAccionRestService} from './servicios/rest/servicios/tipo-accion-rest.service';
import {NoticiaEmisorRestService} from './servicios/rest/servicios/noticia-emisor-rest.service';
import {SliderAuspiciantesModule} from './compartido/slider-auspiciantes/slider-auspiciantes.module';
import {SocketJuegoService} from './servicios/rest/servicios/socket-juego-rest.service';
import {RentaFijaRondaRestService} from './servicios/rest/servicios/renta-fija-ronda-rest.service';
import {ConfiguracionesModule} from './modulos/configuraciones/configuraciones.module';
import {AdministradorModule} from './modulos/administrador/administrador.module';
import {RentaFijaEmisorRestService} from './servicios/rest/servicios/renta-fija-emisor-rest.service';
import {MostrarAyudaComponent} from './componentes/mostrar-ayuda/mostrar-ayuda.component';
import {JugadorGuard} from './servicios/guard/jugador.guard';
import {AdministradorGuard} from './servicios/guard/administrador.guard';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent,
    NoticiaFormularioComponent,
    AppComponent,
    RutaNoEncontradaComponent,
    MostrarAyudaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BlockUIModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    ListarJugadoresModule,
    MostrarNoticiasModule,
    AccionesEmisorRondaModule,
    MenuOpcionesInicioModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    JuegoModule,
    GraficoAccionesModule,
    ListaJuegosModule,
    InputCantidadModule,
    TextMaskModule,
    ComprarAccionesRetaFijaModule,
    SliderAuspiciantesModule,
    ComprarAccionesRetaFijaModule,
    ConfiguracionesModule,
    AdministradorModule,
  ],
  providers: [
    AccionesEmisorRondaRestService,
    AccionesParticipanteRestService,
    ArchivoEmisorRestService,
    ArchivoRestService,
    ConfiguracionesRestService,
    EmisorJuegoRestService,
    EmisorRestService,
    JuegoRestService,
    JugadaParticipanteRestService,
    NivelJuegoRestService,
    NoticiaEmisorRestService,
    NoticiaRestService,
    NoticiasRondaRestService,
    ParticipanteJuegoRestService,
    ParticipanteRestService,
    RentaFijaRestService,
    RondaRestService,
    TipoAccionRestService,
    CookieService,
    SocketJuegoService,
    RentaFijaRondaRestService,
    RentaFijaEmisorRestService,
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
