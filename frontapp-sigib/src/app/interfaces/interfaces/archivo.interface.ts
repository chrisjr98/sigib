import {EmisorInterface} from './emisor.interface';
import {ArchivoEmisorInterface} from './archivo-emisor.interface';

export interface ArchivoInterface {
    id: number;
    originalName: string;
    encoding: string;
    mimetype: string;
    buffer: string;
    size: number;
    emisor: EmisorInterface;
    archivoEmisor: ArchivoEmisorInterface;
}
