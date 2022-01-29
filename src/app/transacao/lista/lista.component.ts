import { Transacao } from './../../../models/Transacao';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private transacoesService : TransacoesService) { }

  ngOnInit(): void {

  }

  get transacoes() : Array<Transacao> {
    return this.transacoesService.transacoes;
  }

  get somatorio() {
    return this.transacoesService.somatorioFormatado;
  }

}
