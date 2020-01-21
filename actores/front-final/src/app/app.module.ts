import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InicioComponent } from './rutas/inicio/inicio.component';
import { RutasAppModule } from './app.routes';
import { LoginComponent } from './rutas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AutenticacionService } from './servicios/autenticacion.service';
import { ToasterModule } from 'angular2-toaster';
import { ReestablecerPasswordComponent } from './rutas/reestablecer-password/reestablecer-password.component';
import { MyOwnCustomMaterialModule } from './modulos/material/material.module';
import { AplicacionComponent } from './rutas/aplicacion/aplicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    ReestablecerPasswordComponent,
    AplicacionComponent,
  ],
  imports: [
    BrowserModule,
    RutasAppModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MyOwnCustomMaterialModule,
  ],
  providers: [
    AutenticacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
