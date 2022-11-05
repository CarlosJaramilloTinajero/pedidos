import { Component, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-con-calendario',
  templateUrl: './con-calendario.component.html',
  styleUrls: ['./con-calendario.component.css']
})
export class ConCalendarioComponent implements OnInit {

  date: Date = new Date("2022-11-1");

  diaSemana: string[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  meses: string[] = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
    "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];


  indice: number = 0;
  conDia: ConDia[] = [];
  diasMes: string[] = [];
  mes: string = "";
  mesInt: number = 0;
  ano: number = 0;
  dia: number[] = [];



  constructor(private conDiaService: ConDiaService) { }

  ngOnInit(): void {
    this.getDia();
  }

  getConDia() {
    this.conDiaService.getConDia().subscribe(data => {
      this.conDia = data
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
        this.diasMes[i] = this.diaSemana[new Date(this.ano, mes, i - (this.indice - 1)).getDay()];
        this.dia[i] = i - (this.indice - 1);
        // (i - indice) + 1
      } else {

        this.diasMes[i] = "H" ;
        
      }
    }

    // this.diasMes.forEach(dia => console.log(dia));

    console.log(this.getCantidadDias(mes, this.ano));
    // console.log(date.getDate());
    // console.log(this.diaSemana[date.getDay()]);
  }


  // Helper
  inicializarVar() {
    this.indice = 0;
    this.conDia = [];
    this.diasMes = [];
    this.mes = "";
    this.mesInt = 0;
    this.ano = 0;
    this.dia = [];
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

}
