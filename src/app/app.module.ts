import { GlobalComponentsModule } from './global-components/global-components.module';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleModule } from './sample/sample.module';
import { TransacaoModule } from './transacao/transacao.module';
import { registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(ptBr,'pt')


@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SampleModule,
    TransacaoModule,
    GlobalComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt' }, {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
