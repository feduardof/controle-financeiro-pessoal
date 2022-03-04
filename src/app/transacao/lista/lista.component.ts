import { Transacao } from './../../../models/Transacao';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Output() editEvent: EventEmitter<Transacao> = new EventEmitter();

  mesAtual : Date = new Date();

  constructor(private transacoesService : TransacoesService) { }

  ngOnInit(): void {

  }

  get transacoes() : Array<Transacao> {
    return this.transacoesService.transacoes;
  }

  get resto() {
    return this.transacoesService.resto;
  }

  onEdit(transacao : Transacao) {
    this.editEvent.emit(transacao);
  }


  onMonthChange(newDate: Date) {
    this.transacoesService.setMonthYear(newDate);
    this.mesAtual = newDate;
  }

  registrarTotalNoProximoMes() {
    let dataMes = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() + 1, 1);
    let valorNumerico : number;
    if(this.resto) {
      let nb: any = this.resto.toString().match(/\d+/g)?.join("");
      nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
      valorNumerico = parseFloat(nb);
    } else {
      valorNumerico = 0;
    }
    this.transacoesService.adicionarRestoMes(valorNumerico, dataMes);
  }

  atualizarValor() {
    let dataMes = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth(), 1);
    let valorNumerico : number;
    // if(this.resto) {
    //   let nb: any = this.resto.toString().match(/\d+/g)?.join("");
    //   nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
    //   valorNumerico = parseFloat(nb);
    // } else {
    //   valorNumerico = 0;
    // }
    // this.transacoesService.adicionarRestoMes(valorNumerico, dataMes);
  }

}
