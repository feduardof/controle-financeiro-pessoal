import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentsComponent } from './global-components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  declarations: [ CalendarComponent],
  exports: [ CalendarComponent ]
})
export class GlobalComponentsModule { }
