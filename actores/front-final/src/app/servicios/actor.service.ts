import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorInterface } from '../modulos/actor/interface/actor.interace';

@Injectable()
export class ActorService {

    /********* los metodos BUSCAR CONTAR     requieren id pelicula******* */
    constructor(private readonly _httpClient: HttpClient) {
    }

    crear(actor: ActorInterface) {
        return this._httpClient.post(
            environment.urlBackEnd + '/actor/crear' ,
            actor);
    }

    buscarActoresPorPeli(idPelicula: number, skip: number, take: number, patron: string): Observable<any> {
        return this._httpClient.post(
            environment.urlBackEnd + '/actor/buscar' ,
            {
                patron,
                idPelicula,
                skip,
                take
            });
    }

    contarBuscadosPorPeli(idPelicula: number, patron: string): Observable<number> {
        return this._httpClient.get<number>(
            environment.urlBackEnd + '/actor/contarBuscados?'
            + 'idPelicula=' + idPelicula + '&'
            + 'patron=' + patron);
    }

    actualizar(id: number, actualizaciones) {
        return this._httpClient.put(
            environment.urlBackEnd + '/actor/actualizar' ,
            {
                id,
                actualizaciones
            });
    }

    activarDesactivar(id: number) {
        return this._httpClient.post(
            environment.urlBackEnd + '/actor/activarDesactivar' ,
            {
                id,
            });
    }

    obtenerUno(id: number) {
        return this._httpClient.get(
            environment.urlBackEnd + '/actor/encontrarUno/' + id);
    }

}
