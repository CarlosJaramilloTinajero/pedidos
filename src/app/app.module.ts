import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PedidosTablaComponent } from './Components/pedidos-tabla/pedidos-tabla.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './Components/alert/alert.component';
import { LlevadosComponent } from './Components/llevados/llevados.component';
import { TablaLlevadosComponent } from './Components/tabla-llevados/tabla-llevados.component';
import { DeudaComponent } from './Components/deuda/deuda.component';
import { TablaDedudasComponent } from './Components/tabla-dedudas/tabla-dedudas.component';
import { ConDiaComponent } from './Components/con-dia/con-dia.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ConCalendarioComponent } from './Components/con-calendario/con-calendario.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidosComponent,
    NavbarComponent,
    PedidosTablaComponent, 
    AlertComponent, LlevadosComponent, TablaLlevadosComponent, DeudaComponent, TablaDedudasComponent, ConDiaComponent, FooterComponent, ConCalendarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
