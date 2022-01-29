import { DateRanger } from './DateRanger';
import { Component, OnInit, ChangeDetectionStrategy, Output, Input, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query,
    stagger, state, group } from '@angular/animations'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
      // transition('active', [
      //     ,
      //     animate('0.8s ease-out', style('*'))
      //   ]),
      // transition('remove', [
      //     style({ color: 'red', fontSize: '50px' }),
      //     animate('0.8s ease-out', style('*'))
      //   ])
    ])
  ]
})
export class CalendarComponent implements OnInit {

  private modeRanger = false;

  @Input() date?: Date;
  @Output() dateChange = new EventEmitter<Date>();

  @Output() delimiter?: DateRanger;
  @Output() dateRange?: DateRanger;

  struct?: Date[][];

  showDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    if (this.dateRange != null) {
      this.modeRanger = true;
      if (this.dateRange?.min) {
        this.showDate = new Date(this.dateRange?.min);
      }
    } else if(this.date != null) {
      this.showDate = new Date(this.date);
    }
    this.mountStruct();
  }

  get month() {
    return this.showDate.toLocaleString('default', { month: 'long' });
  }
  get year() {
    return this.showDate.getFullYear();
  }

  get firstDay() {
    return new Date(this.showDate.getFullYear(), this.showDate.getMonth(), 1);
  }

  get lastDay() {
    return new Date(this.showDate.getFullYear(), this.showDate.getMonth() + 1, 0);
  }

  get today() : Date {
    return new Date();
  }

  nextMonth() {
    this.showDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth() + 1, 1);
    this.mountStruct();
  }
  previousMonth() {
    this.showDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth() - 1, 1);
    this.mountStruct();
  }

  mountStruct() {

    let struct = [];
    let daysOfWeek = [...Array(7).keys()];
    let currentDate = this.firstDay;
    currentDate.setDate(currentDate.getDate() - this.firstDay.getDay())
    let plusOneDate = () => currentDate.setDate(currentDate.getDate() + 1);
    let thoseAreDays = true;
    do {
      let week: (Date) [] = [];
      daysOfWeek.forEach((i) => {
        week.push(new Date(currentDate));
        thoseAreDays = !(currentDate.getMonth() != this.firstDay.getMonth());
        plusOneDate();
      });
      struct.push(week)
    } while (thoseAreDays);

    this.struct = struct;
  }

  selectDate(date : Date) {
    this.date = date;
    this.dateChange.emit(date);
  }
  isToday(day : Date) {
    return this.today.getFullYear() == day.getFullYear() &&
      this.today.getMonth() == day.getMonth() &&
      this.today.getDate() == day.getDate();
  }
  inDifferentMonthStruct(day : Date) {
    return this.month != day.toLocaleString('default', { month: 'long' })
  }
  isWeekend(day : Date) {
    return day.getDay() == 0 || day.getDay() == 6;
  }



}
