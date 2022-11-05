import { Component, OnInit } from '@angular/core';
import { Llevados } from 'src/app/Models/llevados';
import { LlevadosService } from 'src/app/Services/llevados.service';

@Component({
  selector: 'app-llevados',
  templateUrl: './llevados.component.html',
  styleUrls: ['./llevados.component.css']
})
export class LlevadosComponent implements OnInit {

  totalPagado: number = 0;
  totalPropina: number = 0;
  totalPrecio: number = 0;

  dia: string = "";

  // Alert
  mostrar: number = 0;
  msg: string = "";
  class: string = "";

  llevados: Llevados[] = [];
  constructor(private llevadosService: LlevadosService) { }

  ngOnInit(): void {
    this.getLllevados();
  }

  getLllevados() {
    this.llevadosService.getLlevados().subscribe(data => {
      this.llevados = data
      this.getTotales(data);
    });
  }

  putLlevado(llevado: Llevados) {
    this.llevadosService.putLlevado(llevado).subscribe(data => {
      console.log(data)
      this.getLllevados()
      this.ponerAler("Pedido '" + llevado.domicilio + "' modificado", "alert alert-success");
    });
  }

  deleteLlevado(llevado: Llevados) {
    this.llevadosService.deleteLlevado(llevado).subscribe(data => {
      console.log(data)
      this.getLllevados()
      this.ponerAler("Pedido '" + llevado.domicilio + "' eliminado", "alert alert-success")
    });
  }

  terminarDia() {
    var ob = { dia: this.dia };
    this.llevadosService.terminarDia(ob).subscribe(data => {
      console.log(data)
      this.getLllevados()
      this.ponerAler("Dia terminado", "alert alert-success")
    });
  }

  // Helpers
  ponerAler(msg: string, clas: string) {
    this.msg = msg;
    this.class = clas;
    this.mostrar = 1;
  }

  quitarAler() {
    this.msg = "";
    this.class = "";
    this.mostrar = 0;
  }

  getTotales(llevados: Llevados[]) {
    this.totalPagado = llevados.reduce((acc, curr) => acc += curr.pago, 0);
    this.totalPropina = llevados.reduce((acc, curr) => acc += curr.propina, 0);
    this.totalPrecio = llevados.reduce((acc, curr) => acc += curr.precio, 0);
  }
}
