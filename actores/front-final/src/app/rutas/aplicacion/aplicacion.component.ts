import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {

  rutas: string[];

  usuarioLogeado = {
    nick: 'alguien',
    rol: 'admin',
    correo: 'alguine@gmail.com',
    horaLogin: '10:02',
    id: 1,
    rutaImagen: 'http://1.bp.blogspot.com/-i83Q7RfAo6U/UlWPbZpiN9I/AAAAAAAABlw/VQIsBgKT2AY/s1600/meme+gato+sorprendido.jpg'
  };

  constructor(private readonly _autentificacionService: AutenticacionService) { }

  ngOnInit() {
    const usuarioAutentificado = this._autentificacionService.obtenerUsuarioLogeado();
    if (usuarioAutentificado) {
      this.usuarioLogeado =  usuarioAutentificado;
    }
  }

}
