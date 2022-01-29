import { Transacao } from './../../../models/Transacao';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  transacao: Transacao = new Transacao(this.currencyPipe);

  constructor(private transacaoService: TransacoesService, private currencyPipe : CurrencyPipe ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.transacaoService.add(this.transacao)
    this.transacao = new Transacao(this.currencyPipe);
  }
  transformAmount(element: any) {
    let nb: any = this.transacao.valorFormatado?.match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : "0";

    this.transacao.valorFormatado = this.currencyPipe.transform(nb);

    element.target.value = this.transacao.valorFormatado;
  }


}
