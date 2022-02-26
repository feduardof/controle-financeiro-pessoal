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
    this.transacoesService.setMonthYear(newDate)
  }

}
