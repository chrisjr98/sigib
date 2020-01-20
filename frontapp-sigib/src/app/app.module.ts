import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ToasterModule} from 'angular2-toaster';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './componentes/header/header.module';
import { FooterModule } from './componentes/footer/footer.module';
import {TextMaskModule} from 'angular2-text-mask';
import { RutaInicioComponent } from './rutas/ruta-inicio/ruta-inicio.component';
import { RutaNoEncontradaComponent } from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import { MenuOpcionesInicioModule } from './componentes/menu-opciones-inicio/menu-opciones-inicio.module';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    HeaderModule,
    FooterModule,
    MenuOpcionesInicioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
