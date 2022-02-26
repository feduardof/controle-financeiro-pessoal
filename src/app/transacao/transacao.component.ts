import { CurrencyPipe } from '@angular/common';
import { Transacao } from 'src/models/Transacao';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.scss']
})
export class TransacaoComponent implements OnInit {

  @Input() transacao: Transacao = new Transacao(this.currencyPipe);

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
  }

  onEdit(transacao: Transacao) {
    this.transacao = new Transacao(this.currencyPipe).fromObject(transacao);
  }

}
