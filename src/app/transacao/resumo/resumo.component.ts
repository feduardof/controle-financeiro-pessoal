import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  constructor(private transacoesService : TransacoesService) { }

  ngOnInit(): void {
  }

  get somatorio() {
    return this.transacoesService.somatorioFormatado;
  }

}
