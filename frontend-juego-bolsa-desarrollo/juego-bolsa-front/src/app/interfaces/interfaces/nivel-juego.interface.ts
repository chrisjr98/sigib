import {JuegoInterface} from './juego.interface';
import {NoticiaInterface} from './noticia.interface';
import {ConfiguracionesInterface} from './configuraciones.interface';

export interface NivelJuegoInterface {
  id?: number;
  nombre?: string;
  habilitado?: number | boolean;
  noticias?: NoticiaInterface[];
  juegos?: JuegoInterface[];
  configuraciones?: ConfiguracionesInterface | number |any;
}
