import { DateRange } from '../../global-components/calendar/DateRange';
import { Component, OnInit } from '@angular/core';
import documentation from 'src/app/global-components/calendar/documentation';


@Component({
  selector: 'app-sample-calendar',
  templateUrl: './sample-calendar.component.html',
  styleUrls: ['./sample-calendar.component.scss']
})
export class SampleCalendarComponent implements OnInit {

  dictionary = documentation;
  dateRange?: DateRange;

  constructor() { }

  ngOnInit() {
  }

}
