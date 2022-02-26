import { UuidService } from './uuid.service';
import { StorageService } from './storage.service';
import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Transacao } from 'src/models/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {


  private listaTransacoes: Array<Transacao> = [];
  // private somatorioRecebido: number = 0;
  // private somatorioGasto: number = 0;
  private monthYear: Date = new Date();

  constructor(private currencyPipe : CurrencyPipe, private storage : StorageService, private uuidService : UuidService) {
    this.load();
  }

  add(transacao: Transacao) {
    if(transacao.id == "") {
      transacao.id = this.uuidService.generateUUID();
      this.listaTransacoes.push(transacao);
    } else {
      var index = this.listaTransacoes.findIndex(e => e.id == transacao.id);
      this.listaTransacoes[index] = transacao;
    }

    this.save();
  }

  load() {
    var transacoes = this.storage.load(this.baseName) as Array<any>;
    this.listaTransacoes = [];
    if(transacoes) {
      this.listaTransacoes = Transacao.fromArray(this.currencyPipe, transacoes);
    }
  }

  save() {
    this.storage.save(this.baseName,this.listaTransacoes);
  }

  setMonthYear(monthYear: Date) {
    this.monthYear = monthYear;
  }

  private get baseName() {
    return "transacoes"
  }

  get transacoes() {
    return this.listaTransacoes.filter((e) => this.inMonthYear(e.data));
  }
  get somatorioGasto() : number {
    return this.transacoes.filter((e) => !e.isEntrada).reduce((c,t2) => c + t2.valor, 0);
  }
  get somatorioGastoFormatado() : string | null {
    return this.currencyPipe.transform(this.somatorioGasto);
  }

  get somatorioRecebido() : number {
    return this.transacoes.filter((e) => e.isEntrada).reduce((c,t2) => c + t2.valor, 0);
  }
  get somatorioRecebidoFormatado() : string | null {
    return this.currencyPipe.transform(this.somatorioRecebido);
  }

  get resto(): string | null {
    return this.currencyPipe.transform(this.somatorioRecebido - this.somatorioGasto);
  }

  private inMonthYear(date : Date) : Boolean {
    return date.getFullYear() == this.monthYear.getFullYear() &&
      date.getMonth() == this.monthYear.getMonth();
  }


}
