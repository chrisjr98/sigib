import {EmisorJuegoInterface} from './emisor-juego.interface';
import {NoticiaEmisorInterface} from './noticia-emisor.interface';
import {ArchivoInterface} from './archivo.interface';
import {RentaFijaInterface} from './renta-fija.interface';

export interface EmisorInterface {
  id?: number;
  nombre?: string;
  descripcion?: string;
  habilitado?: number;
  vendeRentaFija?: number;
  vendeAcciones?: number;
  emisoresJuego?: EmisorJuegoInterface[];
  noticiasEmisor?: NoticiaEmisorInterface[];
  archivos?: ArchivoInterface[];
  papelesRentaFija?: RentaFijaInterface[];
  archivoLogo?: any;
  pathLogo?: string;
  esPositiva?: boolean | number;
  valorAfecta?: number;
}
