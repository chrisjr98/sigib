import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PeliculaService {

    _socket = io(environment.socket + '/producto');

    constructor() {

        this._socket.on('connect', () => {
            console.log('CONECTADO a cliente id:', this._socket.id);
          });
    }

    obtenerTodos(opciones: {skip: number, take: number}): Observable<any> {

        const obtenerPromesa = new Promise((resolve, reject) => {
            this._socket.emit('listar', opciones,
            (productos) => {
                resolve(productos);
              });
        });

        return from(obtenerPromesa);
    }

    obtenerUno(id: number): Observable<any> {
        const obtenerPromesa = new Promise((resolve, reject) => {
            this._socket.emit('encontrarUno', id,
            (producto) => {
                resolve(producto);
              });
        });

        return from(obtenerPromesa);
    }

    editar(id, actualizaciones): Observable<any> {
        const data = {
            id,
            actualizaciones
        };

        const editarPromesa = new Promise((resolve, reject) => {
            this._socket.emit('editar', data,
            (productos) => {
                resolve(productos);
              });
        });

        return from(editarPromesa);
    }

    crear(producto): Observable<any> {
        const crearPromesa = new Promise((resolve, reject) => {
            this._socket.emit('crear', producto,
            (productoR) => {
                resolve(productoR);
              });
        });

        return from(crearPromesa);
    }

    buscar(opciones: {patron: string, skip: number, take: number}): Observable<any> {
        const buscarPromesa = new Promise((resolve, reject) => {
            this._socket.emit('buscar', opciones,
            (productos) => {
                resolve(productos);
              });
        });

        return from(buscarPromesa);
    }

    contarTodos(): Observable<any> {
        const contarPromesa = new Promise((resolve, reject) => {
            this._socket.emit('contar', '',
            (contados) => {
                resolve(contados);
            });
        });

        return from(contarPromesa);
    }

    contarBuscados(patron): Observable<any> {
        const contarPromesa = new Promise((resolve, reject) => {
            this._socket.emit('contar', patron,
            (contados) => {
                resolve(contados);
            });
        });

        return from(contarPromesa);
    }

    activarDesactivar(id): Observable<any> {
        const data = {
            id,
        };

        const activarDesactivar = new Promise((resolve, reject) => {
            this._socket.emit('activarDesactivar', data,
            (resultado) => {
                resolve(resultado);
              });
        });

        return from(activarDesactivar);
    }
}
