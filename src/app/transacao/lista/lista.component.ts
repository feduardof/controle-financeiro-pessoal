import { Transacao } from './../../../models/Transacao';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Output() editEvent: EventEmitter<Transacao> = new EventEmitter();

  mesAtual : Date = new Date();

  constructor(private transacoesService : TransacoesService, private router: Router,) { }

  ngOnInit(): void {

  }

  get transacoes() : Array<Transacao> {
    return this.transacoesService.transacoes.sort((a,b) => { return a.data.getTime() - b.data.getTime(); } );
  }

  get resto() {
    return this.transacoesService.resto;
  }

  onEdit(transacao : Transacao) {
    // this.editEvent.emit(transacao);
    this.router.navigate(["/transacoes/formulario/" + transacao.id ]);
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
