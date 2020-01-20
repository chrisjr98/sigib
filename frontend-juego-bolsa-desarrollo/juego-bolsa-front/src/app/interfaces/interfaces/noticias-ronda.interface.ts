import {RondaInterface} from './ronda.interface';
import {NoticiaInterface} from './noticia.interface';
import {NoticiaEmisorInterface} from './noticia-emisor.interface';

export interface NoticiasRondaInterface {
    id: number;
    noticiaEmisor: NoticiaEmisorInterface;
    ronda: RondaInterface;
    idJuego: number;
    idNoticia: number;
    idEmisor: number;
    esPositiva: number | boolean;
}
