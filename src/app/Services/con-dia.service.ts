import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConDia } from '../Models/con-dia';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConDiaService {

  urlGet: string = "https://api.peliculas.beauty/getConDia";
  constructor(private http: HttpClient) { }

  getConDia(): Observable<ConDia[]> {
    return this.http.get<ConDia[]>(this.urlGet);
  }
}
