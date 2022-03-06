import { TransacoesService } from './../../../services/transacoes.service';
import { CurrencyPipe } from '@angular/common';
import { Transacao } from 'src/models/Transacao';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-view-formulario',
  templateUrl: './view-formulario.component.html',
  styleUrls: ['./view-formulario.component.scss']
})
export class ViewFormularioComponent implements OnInit {
  @Input() transacao: Transacao = new Transacao(this.currencyPipe);

  constructor(private currencyPipe: CurrencyPipe, private route : ActivatedRoute, private transacoesService : TransacoesService ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params['id'])
      this.transacao = this.transacoesService.find(params['id']) ?? new Transacao(this.currencyPipe);
    });
  }

}
