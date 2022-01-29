import { GlobalComponentsModule } from './../global-components/global-components.module';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TransacaoComponent } from './transacao.component';
import { ListaComponent } from './lista/lista.component';
import { ResumoComponent } from './resumo/resumo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GlobalComponentsModule
  ],
  declarations: [TransacaoComponent, ListaComponent, FormularioComponent, ResumoComponent, ],
  providers: [ CurrencyPipe ]
})
export class TransacaoModule { }
