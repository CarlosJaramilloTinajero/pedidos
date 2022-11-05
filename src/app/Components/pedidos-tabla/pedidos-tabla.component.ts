import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deuda } from 'src/app/Models/deuda';
import { Llevados } from 'src/app/Models/llevados';
import { Pedidos } from 'src/app/Models/pedidos';

@Component({
  selector: 'app-pedidos-tabla',
  templateUrl: './pedidos-tabla.component.html',
  styleUrls: ['./pedidos-tabla.component.css']
})
export class PedidosTablaComponent implements OnInit {

  tituloModal: string = "";

  // Datos de entrada
  @Input() pedidos: Pedidos[] = [];

  // Eventos de salida
  @Output() eventEliminar: EventEmitter<Pedidos> = new EventEmitter();
  @Output() eventPut: EventEmitter<Pedidos> = new EventEmitter();
  @Output() eventLlevado: EventEmitter<Llevados> = new EventEmitter();
  @Output() eventDeuda: EventEmitter<Deuda> = new EventEmitter();

  // Objetos para los modales
  pedidoModal: Pedidos = new Pedidos();
  llevadoModal: Llevados = new Llevados();
  deudaModal: Deuda = new Deuda();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarPedido() {
    this.eventEliminar.emit(this.pedidoModal);
  }

  submitLlevado() {
    this.llevadoModal.id = this.pedidoModal.id;
    this.llevadoModal.domicilio = this.pedidoModal.domicilio;
    this.llevadoModal.precio = this.pedidoModal.precio;
    this.eventLlevado.emit(this.llevadoModal);
    this.llevadoModal = new Llevados();
  }

  pedidoToPedidoModal(pedido: Pedidos) {
    this.pedidoModal.id = pedido.id;
    this.pedidoModal.domicilio = pedido.domicilio;
    this.pedidoModal.precio = pedido.precio;
    this.pedidoModal.posicion = pedido.posicion;
    this.tituloModal = pedido.domicilio;
  }

  submitModificar() {
    this.eventPut.emit(this.pedidoModal);
  }

  submitDeuda() {
    this.deudaModal.id = this.pedidoModal.id;
    this.deudaModal.domicilio = this.pedidoModal.domicilio;
    this.eventDeuda.emit(this.deudaModal);
  }

}
