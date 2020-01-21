import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../modulos/usuario/interfaces/usuario.interface';


@Injectable()
export class UsuarioService {

    constructor(private readonly _httpClient: HttpClient) { }

    obtenerUsuarios(): Observable<any> {

        return this._httpClient.get(environment.urlBackEnd + '/usuario');
    }

    buscarUsuarios(patron: string, skip: number, take: number): Observable<any> {
        console.log('patron',patron);
        return this._httpClient.post(environment.urlBackEnd + '/usuario/buscar',
            {
                patron,
                skip,
                take
            });
    }

    obtenerUno(id: number): Observable<any> {
        return this._httpClient.get(environment.urlBackEnd + '/usuario/encontrarUno/' + id);
    }

    editar(id: number, actualizaciones): Observable<any> {
        return this._httpClient.put(environment.urlBackEnd + '/usuario/actualizar',
            { id, ...actualizaciones });
    }

    crear(usuario: UsuarioInterface): Observable<any> {
        return this._httpClient.post(environment.urlBackEnd + '/usuario/crear',
            usuario);
    }

    resetearPassword(id) {
        return this._httpClient.post(environment.urlBackEnd + '/usuario/resetearPassword',
            { id });
    }

    contarBuscados(palabraBusqueda: string) {
        return this._httpClient.get(environment.urlBackEnd
            + '/usuario/contarBuscados?palabraBuscada=' + palabraBusqueda);
    } 

    activarDesactivar(id: number): Observable<any> {

        return this._httpClient.post(environment.urlBackEnd + '/usuario/activarDesactivar',
            {
                id
            });
    }
}
