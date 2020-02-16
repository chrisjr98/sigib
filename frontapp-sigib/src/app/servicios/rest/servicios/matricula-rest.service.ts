import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PrincipalRestService } from '../rest-principal.service';
import { MatriculaInterface } from 'src/app/interfaces/interfaces/matricula.interface';

@Injectable({
  providedIn: 'root'
})
export class MatriculaRestService  extends PrincipalRestService<MatriculaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'matricula';
  }
}
