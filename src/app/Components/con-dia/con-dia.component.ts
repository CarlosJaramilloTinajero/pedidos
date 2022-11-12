import { Component, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-con-dia',
  templateUrl: './con-dia.component.html',
  styleUrls: ['./con-dia.component.css']
})
export class ConDiaComponent implements OnInit {

  // Variebles maximo de filas de la tabla
  maxFilas: number = 25;
  maxFilasInput = this.maxFilas;
  pagina: number = 1;
  paginaA: number = 0;
  maxPedidos: number = 0;


  // Variables busqueda por domicilio o dia
  busquedaPor: string = "dia";
  domForm: string = "";
  diaForm: string = "";
  dia: string = "";
  dom: string = "";


  // Registros de la BD obtenidos del back
  conDia: ConDia[] = [];

  // Registros filtrados del arreglo conDia, para la tabla de totales
  conDiaFillter: ConDia[] = [];

  // Totales tabla chica
  totalPropina: number = 0;
  totalPagado: number = 0;

  // Variables de tipo de acomodo para cada atrbuto
  precioAcomodar: string = "Normal";
  pagoAcomodar: string = "Normal";
  propinaAcomodar: string = "Normal";

  constructor(private conDiaService: ConDiaService) { }

  ngOnInit(): void {
    this.getConDia();
  }


  // Obteniendo los registros conDia del back 
  getConDia() {
    this.conDiaService.getConDia().subscribe(data => {
      this.conDia = data
      this.conDiaFillter = data
      this.dia = "";
      this.totalPagado = this.conDiaFillter.reduce((acc, curr) => acc += curr.pago, 0)
      this.totalPropina = this.conDiaFillter.reduce((acc, curr) => acc += curr.propina, 0)
      this.maxPedidos = data.length
    });
  }


  // Busqueda por domicilio o dia
  bucarPordia() {
    this.pagina = 1;
    this.paginaA = 0;
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
    this.pagina = 1;
    this.paginaA = 0;
    this.conDiaFillter = this.conDia.filter((element => element.domicilio.toUpperCase().indexOf(this.domForm.toUpperCase()) > -1));
    this.dom = this.domForm;
  }

  cambioDeBusqueda(tipo: string) {
    this.busquedaPor = tipo;
    this.getConDia();
    this.pagina = 1;
    this.paginaA = 0;
  }


  // Acomodar tabla por atributos
  acomodarPorDomicilio() {
    console.log("hola");
  }

  acomodarPorPrecio() {
    switch (this.precioAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => a.precio - b.precio);
        this.precioAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => b.precio - a.precio);
        this.precioAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        // this.getConDia();
        this.precioAcomodar = "Normal";
        break;
    }
  }

  acomodarPorPago() {
    switch (this.pagoAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => a.pago - b.pago);
        this.pagoAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => b.pago - a.pago);
        this.pagoAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        // this.getConDia();
        this.pagoAcomodar = "Normal";
        break;
    }
  }

  acomodarPorPropina() {
    switch (this.propinaAcomodar) {
      case "Normal":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => a.propina - b.propina);
        this.propinaAcomodar = "MenorAMayor";
        break;
      case "MenorAMayor":
        this.conDiaFillter = this.conDiaFillter.sort((a, b) => b.propina - a.propina);
        this.propinaAcomodar = "MayorAMenor";
        break;
      case "MayorAMenor":
        // this.getConDia();
        this.propinaAcomodar = "Normal";
        break;
    }
  }


  // Tabla maximo filas y botones siguiente y anterior
  siguiente() {
    if (this.pagina * this.maxFilas < this.conDiaFillter.length) {
      this.pagina++;
      this.paginaA++;
      // console.log(this.items.length);
    }
  }

  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.paginaA--;
    }
  }

  maxFilasEvent() {
    if (this.maxFilasInput > 0) {
      this.maxFilas = this.maxFilasInput;
      this.pagina = 1;
      this.paginaA = 0;
    }
  }
}
