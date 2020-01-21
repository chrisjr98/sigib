import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductoraService {

    constructor(private apollo: Apollo,
                private readonly _httpClient: HttpClient) { }

    obtenerTodos(skip, take): Observable<ApolloQueryResult<{}>> {
        const traerTodos$ = this.apollo
            .watchQuery({
                query: gql`query obtenerTodas($skip: Int, $take: Int){
                    encontrarTodasProductoras(skip: $skip, take: $take){
                      id
                      nombre
                      fechaFundacion
                      fundador
                      propietario
                      pais
                      rutaImagen
                  }
                }`,
                variables: {
                    skip,
                    take,
                }
            }).valueChanges;
        return traerTodos$;
    }

    crear(productora) {
      console.log(productora);
        const crear$ = this.apollo
            .mutate({
                mutation: gql`mutation crearProductora($productora: ProductoraCrear) {
                    crearProductora(productora: $productora){
                    id
                    nombre
                    fechaFundacion
                    fundador
                    propietario
                    pais
                    activo
                  }
                }`,
                variables: {
                    productora
                  }
            });
        return crear$;
    }

  editar(id, actualizaciones) {
    const editar$ = this.apollo
    .mutate({
      mutation: gql`mutation editarProductora($id: Int, $actualizaciones: ActualizacionProductora) {
        editarProductora(id: $id, actualizaciones: $actualizaciones)
    }`,
      variables: {
        id,
        actualizaciones
      }
    });
    return editar$;
  }

  obtenerUno(id) {
    const traerUno$ = this.apollo
    .watchQuery({
      query: gql`query encontrarUna($id: Int){
        encontrarUnaProductora(id: $id){
          id
          nombre
          fechaFundacion
          fundador
          propietario
          pais
          rutaImagen
      }
    }`,
      variables:
        {id}
    }).valueChanges;
    return traerUno$;
  }

  contar() {
    const cuenta$ = this.apollo
    .watchQuery({
      query: gql`query contarTodos{
        contarProductoras
      }`,
    }).valueChanges;
    return cuenta$;
  }

  buscar(palabraBusqueda, skip, take) {
    const buscar$ = this.apollo
    .watchQuery({
      query: gql`query buscar($palabraBusqueda: String, $skip: Int, $take: Int){
        buscarProductora(palabraBusqueda: $palabraBusqueda, skip: $skip, take: $take){
          id
          nombre
          fechaFundacion
          fundador
          propietario
          pais
          activo
          rutaImagen
        }
      }`,
      variables: {
        palabraBusqueda,
        skip,
        take,
      }

    }).valueChanges;
    return buscar$;
  }

  contarBuscados(palabraBusqueda) {
    const cuentaBuscados$ = this.apollo
    .watchQuery({
      query: gql`query contarBuscados($palabraBusqueda: String){
        contarProductorasBuscadas(palabraBusqueda: $palabraBusqueda)
      }`,
      variables: {
        palabraBusqueda
      }

    }).valueChanges;
    return cuentaBuscados$;
  }

  activarDesactivar(id) {
    const traerUno$ = this.apollo
    .mutate({
      mutation: gql`mutation activarDesactivarUno($id: Int){
        activarDesactivarProductora(id: $id)
    }`,
      variables:
        {id}
    });
    return traerUno$;
  }

  cambiarImagen(id, file) {
    const parametros = {
      id,
      file,
    };
    this._httpClient.post(environment.urlBackEnd + '/subirFotoProductora', parametros);
  }
}
