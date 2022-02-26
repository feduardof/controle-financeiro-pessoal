import { Transacao, TiposTransacao } from './../../../models/Transacao';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  @Input() transacao: Transacao = new Transacao(this.currencyPipe);
  @Output() transacaoChange = new EventEmitter<Transacao>();
  @Input() tipoTransacao: TiposTransacao = TiposTransacao.CORRENTE;
  @Input() dataInicio: Date = new Date();
  @Input() dataFim: Date = new Date();
  @Input() diaMes: number = 1;


  constructor(private transacaoService: TransacoesService, private currencyPipe: CurrencyPipe) {

  }

  ngOnInit() {
  }

  private diffMonths(dt1 : Date, dt2 : Date) {
    return ((dt2.getFullYear() - dt1.getFullYear()) * 12) - (dt1.getMonth() - 1) + dt2.getMonth();

    // return (dt2.getFullYear() + dt2.getMonth()) - (dt1.getFullYear() + dt1.getMonth());
  }


  onSubmit() {
    if(this.tipoTransacao == TiposTransacao.CORRENTE) {
      this.transacaoService.add(this.transacao);
      this.onClear();
    } else {
      if(this.diaMes < 1 || this.diaMes > 28) this.diaMes = 1;
      this.dataInicio.setDate(this.diaMes);
      this.dataFim.setDate(this.diaMes);

      if(this.dataFim.getTime() < this.dataFim.getTime()) {
        var data = new Date(this.dataFim);
        this.dataFim = this.dataInicio;
        this.dataInicio = data;
      }

      var months = this.diffMonths(this.dataInicio,this.dataFim);


      var datePointer = new Date(this.dataInicio);

      for (let index = 0; index < months; index++) {

        var transacao = new Transacao(this.currencyPipe).fromObject(JSON.parse(JSON.stringify(this.transacao)));
        transacao.data = new Date(datePointer);
        console.log(transacao.data.getMonth());

        if(transacao.data.getMonth() + 1 > 11) {
          datePointer.setFullYear(datePointer.getFullYear() + 1);
          datePointer.setMonth(0);
        } else {
          datePointer.setMonth(datePointer.getMonth() + 1);
        }


        this.transacaoService.add(transacao);

      }
    }

  }
  transformAmount(element: any) {
    let nb: any = this.transacao.valorFormatado?.match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : "0";

    this.transacao.valorFormatado = this.currencyPipe.transform(nb);

    element.target.value = this.transacao.valorFormatado;
  }

  // onMonthChange(newDate: Date) {
  //   this.transacaoService.setMonthYear(newDate)
  // }

  onClear() {
    this.transacao = new Transacao(this.currencyPipe);
    this.transacaoChange.emit(this.transacao);
  }

  onDelete() {

  }



}
