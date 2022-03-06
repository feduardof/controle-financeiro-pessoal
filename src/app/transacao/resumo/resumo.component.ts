import { Categoria } from './../../../models/Categoria';
import { CategoriaService } from 'src/services/categoria.service';
import { TransacoesService } from './../../../services/transacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  constructor(private transacoesService : TransacoesService, private categoriaService : CategoriaService) { }

  ngOnInit(): void {
  }

  get somatorioGasto() {
    return this.transacoesService.somatorioGastoFormatado;
  }
  get somatorioRecebido() {
    return this.transacoesService.somatorioRecebidoFormatado;
  }
  get resto() {
    return this.transacoesService.resto
  }

  get ehRestoPositivo() {
    return this.transacoesService.ehRestoPositivo;
  }

  get categorias() {
    return this.categoriaService.CATEGORIAS;
  }

  obterSomatorioCategoria(categoria : Categoria)  {
    return this.transacoesService.somatorioGastoCategoria(categoria);
  }

  openList() {
    this.transacoesService.openList();
  }

}
