import {NoticiaEmisorInterface} from './noticia-emisor.interface';
import {NivelJuegoInterface} from './nivel-juego.interface';
import {NoticiasRondaInterface} from './noticias-ronda.interface';
import {TipoNoticiaInterface} from './tipo-noticia.interface';

export interface NoticiaInterface {
    id?: number;
    titulo: string;
    descripcion: string;
    habilitado: number;
    noticiasEmisor?: NoticiaEmisorInterface[];
    noticiasRonda?: NoticiasRondaInterface[];
    tipo: TipoNoticiaInterface | string;
    nivelJuego: NivelJuegoInterface | string;
}
