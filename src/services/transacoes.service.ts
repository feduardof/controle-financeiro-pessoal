import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Transacao } from 'src/models/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  private listaTransacoes: Array<Transacao> = [];
  private somatorio: number = 0;

  constructor(private currencyPipe : CurrencyPipe) { }

  add(transacao: Transacao) {

    this.somatorio = this.somatorio + transacao.valor;
    this.listaTransacoes.push(transacao);
  }

  get transacoes() {
    return this.listaTransacoes;
  }

  get somatorioFormatado() : string | null {
    return this.currencyPipe.transform(this.somatorio);
  }

}
