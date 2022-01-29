import { SampleMessageComponent } from './sample-message/sample-message.component';
import { SampleBtnComponent } from './sample-btn/sample-btn.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SampleComponent, SampleBtnComponent, SampleMessageComponent],
  exports: [ SampleComponent ]
})
export class SampleModule { }
