import { SampleComponent } from './sample/sample.component';
import { TransacaoComponent } from './transacao/transacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'transacoes', pathMatch: 'full' },
  { path: 'transacoes', component: TransacaoComponent},
  { path: 'sample', component: SampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

