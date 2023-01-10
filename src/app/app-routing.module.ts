import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConCalendarioComponent } from './Components/con-calendario/con-calendario.component';
import { ConDiaComponent } from './Components/con-dia/con-dia.component';
import { DeudaComponent } from './Components/deuda/deuda.component';
import { LlevadosComponent } from './Components/llevados/llevados.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';

const routes: Routes = [{
  path: '',
  component: PedidosComponent
}, {
  path: 'Llevados',
  component: LlevadosComponent
}, {
  path: 'Deudas',
  component: DeudaComponent
}, {
  path: 'todosLosPedidos',
  component: ConDiaComponent
},{
  path: 'conCalendario',
  component: ConCalendarioComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
