import { Injectable } from '@angular/core';
import { Pedidos } from '../Models/pedidos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlGet: string = "https://salas.peliculas.beauty/getPedidos";

  urlPost: string = "https://salas.peliculas.beauty/addPedido";

  urlDelete: string = "https://salas.peliculas.beauty/deletePedido/";

  urlPut: string = "https://salas.peliculas.beauty/putPedido/";

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(this.urlGet);
  }

  addPedido(pedido: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(this.urlPost, pedido);
  }

  deletePedido(pedido: Pedidos): Observable<any> {
    return this.http.delete<Pedidos>(this.urlDelete + pedido.id);
  }

  putPedido(pedido: Pedidos): Observable<Pedidos> {
    return this.http.put<Pedidos>(this.urlPut + pedido.id, pedido);
  }
}
