
import { ViewResumoComponent } from './transacao/view-resumo/view-resumo.component';
import { FormularioComponent } from './transacao/formulario/formulario.component';
import { SampleComponent } from './sample/sample.component';
import { TransacaoComponent } from './transacao/transacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFormularioComponent } from './transacao/view-formulario/view-formulario.component';


const routes: Routes = [
  { path: '', redirectTo: 'transacoes', pathMatch: 'full' },
  { path: 'transacoes', component: TransacaoComponent },
  { path: 'transacoes/formulario', component: ViewFormularioComponent },
  { path: 'transacoes/formulario/:id', component: ViewFormularioComponent, pathMatch: 'full' },
  { path: 'transacoes/resumo', component: ViewResumoComponent},
  { path: 'sample', component: SampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

