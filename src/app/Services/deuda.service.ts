import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deuda } from '../Models/deuda';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeudaService {

  urlGet = "https://api.peliculas.beauty/getDeudas";
  urlPost = "https://api.peliculas.beauty/addDeudas";
  urlPut = "https://api.peliculas.beauty/putDeudas/";
  urlDelete = "https://api.peliculas.beauty/deleteDeudas/";

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
