import {WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { PeliculaService } from 'pelicula/pelicula.service';
import { PeliculaDto } from 'pelicula/pelicuta.dto';

@WebSocketGateway(3001, {namespace: 'producto'})
export class PeliculaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

   constructor(private readonly _peliculaService: PeliculaService){}

    afterInit(server: any) {
        // console.log('modulo producto esuchando');
    }

    handleConnection(client: any, ...args: any[]) {
        // console.log('se conecto el cliente', client.id);
    }
    handleDisconnect(client: any) {
        // console.log('se DESconecto el cliente', client.id);
    }

    @SubscribeMessage('listar')
    encontrarTodos(client, data): Observable<PeliculaDto[]>{// : Observable<any>
        const todosProductos = this._peliculaService.encontrarTodos(data.skip, data.take);
        data = todosProductos;
        return data;

    }

    @SubscribeMessage('encontrarUno')
    encontrarUno(client, data): Observable<PeliculaDto>{
        const producto = this._peliculaService.encontrarUno(data);
        data = producto;
        return data;
    }

    @SubscribeMessage('crear')
    crear(client, data): Observable<PeliculaDto>{
        const producto = this._peliculaService.crear(data);
        data = producto;
        return data;
    }

    @SubscribeMessage('editar')
    editar(client, data): Observable<{mensaje: string}>{
        const producto = this._peliculaService.editar(data.id, data.actualizaciones);
        data = producto;
        return data;
    }
    @SubscribeMessage('buscar')
    buscar(client, data): Observable<PeliculaDto[]>{
        const producto = this._peliculaService.buscar(data.patron, data.skip, data.take);
        data = producto;
        return data;
    }

    @SubscribeMessage('contar')
    contar(client, data): Observable<number>{
        const contados = this._peliculaService.contarTodos();
        data = contados;
        return data;
    }

    @SubscribeMessage('contarBuscados')
    contarBuscados(client, data): Observable<number>{
        const producto = this._peliculaService.contarBuscados(data);
        data = producto;
        return data;
    }

    @SubscribeMessage('activarDesactivar')
    activarDesactivar(client, data): Observable<PeliculaDto>{
        const resultado = this._peliculaService.activarDesactivar(data.id);
        data = resultado;
        return data;
    }
}
