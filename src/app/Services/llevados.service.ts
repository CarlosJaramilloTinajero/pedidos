import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Llevados } from '../Models/llevados';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LlevadosService {

  urlPost: string = "https://api.peliculas.beauty/addLlevado";
  urlGet: string = "https://api.peliculas.beauty/getLlevados";
  urlPut: string = "https://api.peliculas.beauty/putLlevado/";
  urlDelete: string = "https://api.peliculas.beauty/deleteLlevado/";

  urlTerminarDia: string = "https://api.peliculas.beauty/terminarDia";

  constructor(private http: HttpClient) { }

  addLlevado(llevado: Llevados): Observable<any> {
    return this.http.post<Llevados>(this.urlPost, llevado);
  }

  getLlevados(): Observable<Llevados[]> {
    return this.http.get<Llevados[]>(this.urlGet);
  }

  putLlevado(llevado: Llevados): Observable<Llevados> {
    return this.http.put<Llevados>(this.urlPut + llevado.id, llevado);
  }

  deleteLlevado(llevado: Llevados): Observable<any> {
    return this.http.delete<Llevados>(this.urlDelete + llevado.id);
  }

  terminarDia(dia: Object): Observable<any> {
    return this.http.post<Object>(this.urlTerminarDia, dia);
  }

}
