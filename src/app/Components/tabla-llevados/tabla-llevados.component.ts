import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Llevados } from 'src/app/Models/llevados';
import { Pedidos } from 'src/app/Models/pedidos';

@Component({
  selector: 'app-tabla-llevados',
  templateUrl: './tabla-llevados.component.html',
  styleUrls: ['./tabla-llevados.component.css']
})
export class TablaLlevadosComponent implements OnInit {

  @Output() eventModificar: EventEmitter<Llevados> = new EventEmitter();
  @Output() eventEliminar: EventEmitter<Llevados> = new EventEmitter();

  @Input() llevados: Llevados[] = [];
  @Input() mostrarAcciones: boolean = true;
  @Input() classTable: string = "";
  llevadoModal: Llevados = new Llevados();
  tituloModal: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  pedidoToPedidoModal(llevado: Llevados) {
    this.llevadoModal = new Llevados();
    this.llevadoModal = this.deepClonePedidosLlevados(llevado);
    this.tituloModal = this.llevadoModal.domicilio;
  }

  eliminarModal(llevado: Llevados) {
    this.llevadoModal = this.deepClonePedidosLlevados(llevado);
  }

  submitModificar() {
    this.eventModificar.emit(this.llevadoModal);
  }

  eliminarLlevado() {
    this.eventEliminar.emit(this.llevadoModal);
  }

  deepClonePedidosLlevados(pedidos: Llevados): Llevados {
    return JSON.parse(JSON.stringify(pedidos)) as Llevados;
  }

  deepClonePedidos(pedidos: Pedidos): Pedidos {
    return JSON.parse(JSON.stringify(pedidos)) as Pedidos;
  }
}
