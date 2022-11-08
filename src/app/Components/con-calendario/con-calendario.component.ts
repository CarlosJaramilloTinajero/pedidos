import { Component, OnInit } from '@angular/core';
import { ConDia } from 'src/app/Models/con-dia';
import { Llevados } from 'src/app/Models/llevados';
import { Pedidos } from 'src/app/Models/pedidos';
import { ConDiaService } from 'src/app/Services/con-dia.service';

@Component({
  selector: 'app-con-calendario',
  templateUrl: './con-calendario.component.html',
  styleUrls: ['./con-calendario.component.css']
})
export class ConCalendarioComponent implements OnInit {
  conDia: ConDia[] = [];

  constructor(private conDiaService: ConDiaService) { }

  ngOnInit(): void {
    this.getConDia();
  }

  getConDia() {
    this.conDiaService.getConDia().subscribe(data => {
      this.conDia = data
    });
  }
}
