import {EmisorInterface} from './emisor.interface';
import {NoticiaInterface} from './noticia.interface';

export interface NoticiaEmisorInterface {
    id: number;
    esPositiva: number;
    habilitado: number;
    emisor: EmisorInterface;
    noticia: NoticiaInterface;
}
