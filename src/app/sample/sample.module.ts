import { DocumentationComponent } from './documentation/documentation.component';
import { GlobalComponentsModule } from './../global-components/global-components.module';
import { SampleCalendarComponent } from './sample-calendar/sample-calendar.component';
import { SampleMessageComponent } from './sample-message/sample-message.component';
import { SampleBtnComponent } from './sample-btn/sample-btn.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalComponentsModule
  ],
  declarations: [SampleComponent, SampleBtnComponent, SampleMessageComponent, SampleCalendarComponent, DocumentationComponent],
  exports: [ SampleComponent ]
})
export class SampleModule { }
