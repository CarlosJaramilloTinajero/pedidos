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


  maxFilas: number = 25;
  maxFilasInput = this.maxFilas;
  pagina: number = 1;
  paginaA: number = 0;

  tituloModal: string = "";

  // Datos de entrada
  @Input() pedidos: Pedidos[] = [];
  @Input() maxPedidos: number = 0;

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
    this.pedidoModal = this.deepClonePedidos(pedido);
    this.tituloModal = this.pedidoModal.domicilio;
  }

  submitModificar() {
    this.eventPut.emit(this.pedidoModal);
  }

  submitDeuda() {
    this.deudaModal.id = this.pedidoModal.id;
    this.deudaModal.domicilio = this.pedidoModal.domicilio;
    this.eventDeuda.emit(this.deudaModal);
  }

  // Tabla
  siguiente() {
    if (this.pagina * this.maxFilas < this.pedidos.length) {
      this.pagina++;
      this.paginaA++;
    }
  }

  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.paginaA--;
    }
  }

  maxFilasEvent() {
    this.maxFilas = this.maxFilasInput;
    this.pagina = 1;
    this.paginaA = 0;
  }

  llevadosModal(pedido: Pedidos) {
    this.llevadoModal = new Llevados();
    this.pedidoModal = this.deepClonePedidos(pedido);
    this.llevadoModal.pago = this.pedidoModal.precio;
  }


  deudaModalEvent(pedido: Pedidos) {
    this.deudaModal = new Deuda();
    this.pedidoModal = this.deepClonePedidos(pedido);
  }

  eliminarModalEvent(pedido: Pedidos) {
    this.pedidoModal = this.deepClonePedidos(pedido);
  }

  deepClonePedidos(pedidos: Pedidos): Pedidos {
    return JSON.parse(JSON.stringify(pedidos)) as Pedidos;
  }
}
