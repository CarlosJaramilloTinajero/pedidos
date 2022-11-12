import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Llevados } from 'src/app/Models/llevados';

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
    this.llevadoModal.id = llevado.id;
    this.llevadoModal.domicilio = llevado.domicilio;
    this.llevadoModal.precio = llevado.precio;
    this.llevadoModal.pago = llevado.pago;
    this.llevadoModal.propina = llevado.propina;

    this.tituloModal = llevado.domicilio;
  }

  submitModificar() {
    this.eventModificar.emit(this.llevadoModal);
  }

  eliminarLlevado() {
    this.eventEliminar.emit(this.llevadoModal);
  }

}
