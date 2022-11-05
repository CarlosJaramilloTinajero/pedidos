import { Component, OnInit } from '@angular/core';
import { Deuda } from 'src/app/Models/deuda';
import { DeudaService } from 'src/app/Services/deuda.service';

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.component.html',
  styleUrls: ['./deuda.component.css']
})
export class DeudaComponent implements OnInit {

  // Alert
  mostrar: number = 0;
  msg: string = "";
  class: string = "";

  deudas: Deuda[] = [];
  constructor(private deudaService: DeudaService) { }

  ngOnInit(): void {
    this.getDeudas();
  }

  getDeudas() {
    this.deudaService.getDeudas().subscribe(data => {
      this.deudas = data
    });
  }

  putDeuda(deuda: Deuda) {
    this.deudaService.putDeuda(deuda).subscribe(data => {
      console.log(data)
      this.ponerAler("Deuda '" + deuda.domicilio + "' modificada", "alert alert-success")
      this.getDeudas()
    });
  }

  eliminarDeuda(deuda: Deuda) {
    this.deudaService.deleteDedua(deuda).subscribe(data => {
      console.log(data)
      this.ponerAler("Deuda '" + deuda.domicilio + "' eliminada", "alert alert-success")
      this.getDeudas()
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
}
