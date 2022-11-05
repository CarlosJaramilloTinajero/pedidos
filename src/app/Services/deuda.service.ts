import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deuda } from '../Models/deuda';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeudaService {

  urlGet = "https://salas.peliculas.beauty/getDeudas";
  urlPost = "https://salas.peliculas.beauty/addDeudas";
  urlPut = "https://salas.peliculas.beauty/putDeudas/";
  urlDelete = "https://salas.peliculas.beauty/deleteDeudas/";

  constructor(private http: HttpClient) { }

  getDeudas(): Observable<Deuda[]> {
    return this.http.get<Deuda[]>(this.urlGet);
  }

  addDeuda(deuda: Deuda): Observable<any> {
    return this.http.post<Deuda>(this.urlPost, deuda);
  }

  putDeuda(deuda: Deuda): Observable<any> {
    return this.http.put<Deuda>(this.urlPut + deuda.id, deuda);
  }

  deleteDedua(deuda: Deuda): Observable<any> {
    return this.http.delete<Deuda>(this.urlDelete + deuda.id);
  }
}
