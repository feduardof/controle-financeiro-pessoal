import { CategoriaService } from 'src/services/categoria.service';
import { UuidService } from './uuid.service';
import { StorageService } from './storage.service';
import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Transacao } from 'src/models/Transacao';
import { Categoria } from 'src/models/Categoria';
import { Router } from '@angular/router';


interface ArrayEvents {
  [key: string ]: Array<Function>
}
@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  private listaTransacoes: Array<Transacao> = [];
  // private somatorioRecebido: number = 0;
  // private somatorioGasto: number = 0;
  private monthYear: Date = new Date();
  private events: ArrayEvents = {};

  constructor(private currencyPipe : CurrencyPipe, private storage : StorageService, private uuidService : UuidService, private categoriaService: CategoriaService, private router: Router) {
    this.load();
  }

  add(transacao: Transacao) {
    transacao.beforeSave();
    if(transacao.id == "") {
      transacao.id = this.uuidService.generateUUID();
      this.listaTransacoes.push(transacao);
    } else {
      var index = this.listaTransacoes.findIndex(e => e.id == transacao.id);
      this.listaTransacoes[index] = transacao;
    }

    this.save();
  }

  adicionarRestoMes(resto: number, dataMes : Date) {
    let transacao : Transacao | undefined = this.loadTransacaoRestoMes(dataMes);

    if(resto) {
      transacao.valor = resto;
    }
    if(dataMes) {
      transacao.data = dataMes;
    }
    this.add(transacao);
  }

  load() {
    var transacoes = this.storage.load(this.baseName) as Array<any>;
    this.listaTransacoes = [];
    if(transacoes) {
      this.listaTransacoes = Transacao.fromArray(this.currencyPipe, transacoes);
    }
  }

  loadTransacaoRestoMes(data : Date) : Transacao {
    let transacao = this.listaTransacoes.filter((e) => this.inMonthYear(e.data, data)).find((e) => e.isTotalUltimoMes);
    if(transacao == undefined) {
      transacao = new Transacao(this.currencyPipe);
      transacao.isTotalUltimoMes = true;
      transacao.isEntrada = true;
    }
    transacao.descricao = "Sobras de "+data.toLocaleString('pt-BR', { month: 'long' })+" de "+data.getFullYear();
    transacao.categoria = this.categoriaService.CATEGORIAS.ENTRADA;
    return transacao;
  }

  delete(transacao : Transacao) {
    let index = this.listaTransacoes.findIndex(e => e.id == transacao.id);
    this.listaTransacoes.splice(index,1);
    this.save();
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
    return this.listaTransacoes.filter((e) => this.inMonthYear(e.data, this.monthYear));
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
  get ehRestoPositivo(): boolean {
    return this.somatorioRecebido - this.somatorioGasto > 0;
  }

  private inMonthYear(date : Date, monthYear: Date) : Boolean {
    return date.getFullYear() == monthYear.getFullYear() &&
      date.getMonth() == monthYear.getMonth();
  }


  somatorioGastoCategoria(categoria: Categoria) : string | null {
    var valor = this.transacoes.filter((e) => e.categoria.nome == categoria.nome).reduce((c,t2) => c + t2.valor, 0);
    return this.currencyPipe.transform(valor);
  }


  find(id: any): Transacao | undefined {
    return this.listaTransacoes.find((e) => e.id == id);
  }


  openForm(transacao?: Transacao) {
    if (transacao)
      this.router.navigate(["/transacoes/formulario/" + transacao.id ]);
    else
      this.router.navigate(["/transacoes/formulario/"]);
  }
  openResume() {
    this.router.navigate(["/transacoes/resumo"]);
  }
  openList() {
    this.router.navigate(["/transacoes"]);
  }


}
