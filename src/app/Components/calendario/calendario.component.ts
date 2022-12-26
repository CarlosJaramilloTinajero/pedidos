import { Component, Input, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { Llevados } from 'src/app/Models/llevados';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  pedidosModalArr: ConDia[] = [];
  ModalArrPedidosSinDia: Llevados[] = [];
  diaModal: number = 0;
  totalesModal: number[] = [];

  date: Date = new Date();

  diaSemana: string[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Juio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  pedidosPorDia: number[] = [];


  mes: string = "";
  mesInt: number = 0;
  ano: number = 0;
  dias: number[] = [];

  conDia: ConDia[] = [];


  constructor(private conDiaService: ConDiaService) { }

  ngOnInit(): void {
    this.getConDia();
    this.getDia();
  }

  getConDia() {
    this.conDiaService.getConDia().subscribe(data => {
      this.conDia = data
      this.getDia();
    });
  }

  getDia() {
    this.mes = this.meses[this.date.getMonth()];
    this.mesInt = this.date.getMonth();
    this.ano = this.date.getFullYear();

    var mesVar: number = this.date.getMonth();
    var indice: number = 0;

    if (new Date(this.ano, mesVar, 1).getDay() == 0) {
      indice = 6;
    } else {
      indice = (new Date(this.ano, mesVar, 1).getDay()) - 1;
    }

    for (let i = 0; i < this.getCantidadDias(mesVar, this.ano) + indice; i++) {
      if (i >= indice) {
        this.dias[i] = i - (indice - 1);
        this.pedidosPorDia[i] = this.getCantidadDePedidosPorDia(new Date(this.ano, this.mesInt, this.dias[i]));
      }
    }

  }

  pedidosModal(dia: number) {
    this.ModalArrPedidosSinDia = [];
    if (dia < 10) {
      var fecha: string = this.ano.toString() + "-" + (this.mesInt + 1).toString() + "-0" + dia.toString();
    } else {
      var fecha: string = this.ano.toString() + "-" + (this.mesInt + 1).toString() + "-" + dia.toString();
    }
    this.pedidosModalArr = this.conDia.filter(pedido => pedido.dia == fecha);
    this.diaModal = dia;
    var i: number = 0;
    this.pedidosModalArr.forEach(pedidoConDia => {
      this.ModalArrPedidosSinDia[i] = new Llevados();
      this.ModalArrPedidosSinDia[i].id = pedidoConDia.id;
      this.ModalArrPedidosSinDia[i].domicilio = pedidoConDia.domicilio;
      this.ModalArrPedidosSinDia[i].precio = pedidoConDia.precio;
      this.ModalArrPedidosSinDia[i].pago = pedidoConDia.pago;
      this.ModalArrPedidosSinDia[i].propina = pedidoConDia.propina;
      i++;
    });
    this.totalesModal[0] = this.ModalArrPedidosSinDia.reduce((acc, curr) => acc += 1, 0);
    this.totalesModal[1] = this.ModalArrPedidosSinDia.reduce((acc, curr) => acc += curr.precio, 0);
    this.totalesModal[2] = this.ModalArrPedidosSinDia.reduce((acc, curr) => acc += curr.pago, 0);
    this.totalesModal[3] = this.ModalArrPedidosSinDia.reduce((acc, curr) => acc += curr.propina, 0);
  }


  // Helper
  inicializarVar() {
    this.mes = "";
    this.mesInt = 0;
    this.ano = 0;
    this.dias = [];
  }

  siguiente() {
    if (this.mesInt == 11) {
      this.date = new Date(this.ano + 1, 0, 1);
    } else if (this.mesInt < 11) {
      this.date = new Date(this.ano, this.mesInt + 1, 1);
    }
    this.inicializarVar();
    this.getDia();
  }

  anterior() {
    if (this.mesInt == 0) {
      this.date = new Date(this.ano - 1, 11, 1);
    } else if (this.mesInt > 0) {
      this.date = new Date(this.ano, this.mesInt - 1, 1);
    }
    this.inicializarVar();
    this.getDia();
  }

  getCantidadDias(mes: number, ano: number) {
    return new Date(ano, mes + 1, 0).getDate();
  }

  getCantidadDePedidosPorDia(date: Date): number {
    var cant: number = 0;
    this.conDia.forEach(pedido => {
      var datePedido: Date = new Date(pedido.dia);
      datePedido.setDate(datePedido.getDate() + 1);

      if (datePedido.getDate() == date.getDate() && datePedido.getMonth() == date.getMonth()
        && datePedido.getFullYear() == date.getFullYear()) {
        cant++;
      }

    });
    return cant;
  }
}