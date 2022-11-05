import { Component, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-con-dia',
  templateUrl: './con-dia.component.html',
  styleUrls: ['./con-dia.component.css']
})
export class ConDiaComponent implements OnInit {

  busquedaPor: string = "dia";

  porDom: string = "";

  conDia: ConDia[] = [];
  conDiaFillter: ConDia[] = [];
  dia: string = "";
  totalPropina: number = 0;
  totalPagado: number = 0;
  diaForm: string = "";
  constructor(private conDiaService: ConDiaService) { }

  precioAcomodar: string = "Normal";
  pagoAcomodar: string = "Normal";
  propinaAcomodar: string = "Normal";

  ngOnInit(): void {
    this.getConDia();
  }

  cambioDeBusqueda(tipo: string) {
    this.busquedaPor = tipo;
    this.getConDia();
  }

  getConDia() {
    this.conDiaService.getConDia().subscribe(data => {
      this.conDia = data
      this.conDiaFillter = data
      this.dia = "";
      this.totalPagado = this.conDiaFillter.reduce((acc, curr) => acc += curr.pago, 0)
      this.totalPropina = this.conDiaFillter.reduce((acc, curr) => acc += curr.propina, 0)
    });
  }

  bucarPordia() {
    if (this.diaForm == "") {
      this.getConDia();
    }
    else {
      this.conDiaFillter = this.conDia.filter(element => element.dia == this.diaForm);
      this.dia = this.diaForm;
      this.totalPagado = this.conDiaFillter.reduce((acc, curr) => acc += curr.pago, 0)
      this.totalPropina = this.conDiaFillter.reduce((acc, curr) => acc += curr.propina, 0)
    }

  }

  buscarPorDom() {
    this.conDiaFillter = this.conDia.filter((element => element.domicilio.toUpperCase() == this.porDom.toUpperCase()));
  }

  acomodarPorDomicilio() {
    console.log("hola");
  }

  acomodarPorPrecio() {
    switch (this.precioAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDia.sort((a, b) => a.precio - b.precio);
        this.precioAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDia.sort((a, b) => b.precio - a.precio);
        this.precioAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        this.getConDia();
        this.precioAcomodar = "Normal";
        break;
    }
  }

  acomodarPorPago() {
    switch (this.pagoAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDia.sort((a, b) => a.pago - b.pago);
        this.pagoAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDia.sort((a, b) => b.pago - a.pago);
        this.pagoAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        this.getConDia();
        this.pagoAcomodar = "Normal";
        break;
    }
  }

  acomodarPorPropina() {
    switch (this.propinaAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDia.sort((a, b) => a.propina - b.propina);
        this.propinaAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDia.sort((a, b) => b.propina - a.propina);
        this.propinaAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        this.getConDia();
        this.propinaAcomodar = "Normal";
        break;
    }
  }

}
