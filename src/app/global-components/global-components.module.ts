// import { IconComponent } from './icon/icon.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentsComponent } from './global-components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IconDirective } from './icon.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  declarations: [	 CalendarComponent,
      IconDirective
   ],
  exports: [ CalendarComponent, IconDirective ]
})
export class GlobalComponentsModule { }
