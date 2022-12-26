import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deuda } from 'src/app/Models/deuda';

@Component({
  selector: 'app-tabla-dedudas',
  templateUrl: './tabla-dedudas.component.html',
  styleUrls: ['./tabla-dedudas.component.css']
})
export class TablaDedudasComponent implements OnInit {

  @Input() deudas: Deuda[] = [];

  // Eventos de salida
  @Output() eventEliminar: EventEmitter<Deuda> = new EventEmitter();
  @Output() eventPut: EventEmitter<Deuda> = new EventEmitter();
  deudaModal: Deuda = new Deuda();
  tituloModal: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  submitModificar() {
    this.eventPut.emit(this.deudaModal);
  }

  eliminarDeuda() {
    this.eventEliminar.emit(this.deudaModal);
  }

  pedidoToPedidoModal(deuda: Deuda) {
    this.deudaModal = this.deepClonePedidoDeuda(deuda);
    this.tituloModal = deuda.domicilio;
  }

  deudaEliminar(deuda: Deuda) {
    this.deudaModal = this.deepClonePedidoDeuda(deuda);
  }

  deepClonePedidoDeuda(pedidos: Deuda): Deuda {
    return JSON.parse(JSON.stringify(pedidos)) as Deuda;
  }
}
