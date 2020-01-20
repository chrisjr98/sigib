import {ArchivoInterface} from './archivo.interface';

export interface ArchivoEmisorInterface {
    id: number;
    tipo: string;
    habilitado: number;
    archivos: ArchivoInterface[];
}
