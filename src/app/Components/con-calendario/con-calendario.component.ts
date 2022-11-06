import { Component, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-con-calendario',
  templateUrl: './con-calendario.component.html',
  styleUrls: ['./con-calendario.component.css']
})
export class ConCalendarioComponent implements OnInit {

  pedidosModalArr: ConDia[] = [];
  diaModal: number = 0;

  date: Date = new Date("2022-11-1");

  diaSemana: string[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Juio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  conDia: ConDia[] = [];
  pedidosPorDia: number[] = [];

  indice: number = 0;
  diasMes: string[] = [];
  mes: string = "";
  mesInt: number = 0;
  ano: number = 0;
  dias: number[] = [];



  constructor(private conDiaService: ConDiaService) { }

  ngOnInit(): void {
    this.getConDia();
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
    var mes: number = this.date.getMonth();
    this.ano = this.date.getFullYear();

    if (new Date(this.ano, mes, 1).getDay() == 0) {
      this.indice = 6;
    } else {
      this.indice = (new Date(this.ano, mes, 1).getDay()) - 1;
    }

    for (let i = 0; i < this.getCantidadDias(mes, this.ano) + this.indice; i++) {
      if (i >= this.indice) {
        // this.diasMes[i] = this.diaSemana[new Date(this.ano, mes, i - (this.indice - 1)).getDay()];
        this.dias[i] = i - (this.indice - 1);
        this.pedidosPorDia[i] = this.getCantidadDePedidosPorMes(new Date(this.ano, this.mesInt, this.dias[i]));
      }
    }

    // console.log(this.getCantidadDePedidosPorMes(new Date("2022-11-1")));
  }

  pedidosModal(dia: number) {
    if (dia < 10) {
      var fecha: string = this.ano.toString() + "-" + (this.mesInt + 1).toString() + "-0" + dia.toString();

    } else {
      var fecha: string = this.ano.toString() + "-" + (this.mesInt + 1).toString() + "-" + dia.toString();
    }
    this.pedidosModalArr = this.conDia.filter(pedido => pedido.dia == fecha);
    this.diaModal = dia;
    console.log(fecha);
    // console.log(fecha);
  }


  // Helper
  inicializarVar() {
    this.indice = 0;
    // this.conDia = [];
    this.diasMes = [];
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

  getCantidadDePedidosPorMes(date: Date): number {
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
