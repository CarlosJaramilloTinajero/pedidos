import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Deuda } from 'src/app/Models/deuda';
import { Llevados } from 'src/app/Models/llevados';
import { Pedidos } from 'src/app/Models/pedidos';
import { DeudaService } from 'src/app/Services/deuda.service';
import { LlevadosService } from 'src/app/Services/llevados.service';
import { PedidosService } from 'src/app/Services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Pedidos[] = [];
  addPedido: Pedidos = new Pedidos();
  dom: string = "";
  pre: number = 0;
  submitForm: boolean = false;
  pedidoRapidoHabilitar: boolean = false;
  pedidoRapido: string = "";


  // Alert
  mostrar: number = 0;
  msg: string = "";
  class: string = "";
  constructor(private pedidosService: PedidosService, private llevadosService: LlevadosService,
    private deudaService: DeudaService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidosService.getPedidos().subscribe(data => {
      this.pedidos = data;
      // this.pedidosRandom();
      this.pedidos.sort((a, b) => a.posicion - b.posicion);
    });
  }

  addPedidoS(form: NgForm) {
    if (form.valid) {
      if (this.pedidoRapidoHabilitar) {
        this.getPedidoRapido(this.pedidoRapido, form);
      } else {
        this.pedidosService.addPedido(this.addPedido).subscribe(data => {
          console.log(data);
          this.getPedidos();
          this.ponerAler("Pedido agregado '" + this.addPedido.domicilio + "'", "alert alert-success");
          form.resetForm();
          this.addPedido.domicilio = "";
          this.addPedido.precio = 0;
          this.submitForm = false;
        });
      }
    } else {
      // console.log("Invalido");
      this.submitForm = true;

    }
  }

  getPedidoRapido(pedidoString: string, form: NgForm): boolean {
    let arr: string[] = pedidoString.split("-");

    if (arr.length > 4 || arr.length < 3) {
      this.ponerAler("Esta mal escrito el pedido rapido", "alert alert-danger");
      return false;
    } else {
      let pedidoAux = new Llevados();
      if (arr.length == 4) {
        pedidoAux.domicilio = arr[0] + " " + arr[1];
        pedidoAux.precio = parseInt(arr[2]);
        pedidoAux.pago = parseInt(arr[2]);
        pedidoAux.propina = parseInt(arr[3]);
      } else if (arr.length == 3) {
        pedidoAux.domicilio = arr[0];
        pedidoAux.precio = parseInt(arr[1]);
        pedidoAux.pago = parseInt(arr[1]);
        pedidoAux.propina = parseInt(arr[2]);
      }

      this.llevadosService.addLlevado(pedidoAux).subscribe(
        data => {
          form.reset();
          this.pedidoRapido = "";
          this.ponerAler("Pedido '" + pedidoAux.domicilio + "' llevado", "alert alert-success");
        },
        error => {
          this.ponerAler("Error al subir el pedido llevado", "alert alert-danger");
        }
      );
    }
    return false;
  }


  EliminarPedido(pedido: Pedidos, mostrarAlert: boolean) {
    this.pedidosService.deletePedido(pedido).subscribe(data => {
      console.log(data)
      this.getPedidos();
      if (mostrarAlert) {
        this.ponerAler("Pedido eliminado '" + pedido.domicilio + "'", "alert alert-success");
      }
    });
  }

  putPedido(pedido: Pedidos) {
    this.pedidosService.putPedido(pedido).subscribe(data => {
      console.log(data)
      this.ponerAler("Pedido '" + pedido.domicilio + "' modificado", "alert alert-success");
      this.getPedidos()
    });
  }

  addPedidoLlevado(llevado: Llevados, eliminarPedido: boolean) {
    this.llevadosService.addLlevado(llevado).subscribe(data => {
      console.log(data)
      this.ponerAler("Pedido '" + llevado.domicilio + "' llevado", "alert alert-success");
      if (eliminarPedido) {
        var pedidoEliminar: Pedidos = new Pedidos();
        pedidoEliminar.id = llevado.id;
        pedidoEliminar.domicilio = llevado.domicilio;
        this.EliminarPedido(pedidoEliminar, false);
      }
    },
      error => {
        this.ponerAler("Error al subir el pedido llevado", "alert alert-danger");
      });
  }

  addDeuda(deuda: Deuda) {
    this.deudaService.addDeuda(deuda).subscribe(data => {
      console.log(data)
      this.ponerAler("Deuda agregada a el domicilio '" + deuda.domicilio + "'", "alert alert-success");
      // var pedidoE: Pedidos = new Pedidos();
      // pedidoE.id = deuda.id;
      // this.EliminarPedido(pedidoE, false);
    });
  }




  // Helpers
  pedidosRandom() {
    var dms: string[] = ["ch 644", "m 2787", "Susana", "Moto", "Suegra",
      "Reina", "sr Eva", "sr Gloria", "2920 AP", "1905 ald"];

    var max: number = 20;
    for (let index = 0; index < max; index++) {
      this.pedidos[index] = new Pedidos();
      this.pedidos[index].id = index;
      this.pedidos[index].posicion = this.getRandom(1, max);
      this.pedidos[index].domicilio = dms[this.getRandom(0, dms.length)];
      this.pedidos[index].precio = this.getRandom(10, 200);
    }
  }

  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

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
