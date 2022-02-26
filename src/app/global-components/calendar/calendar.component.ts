import { DateRange } from './DateRange';
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
    ])
  ]
})
export class CalendarComponent implements OnInit {

  @Input() modeRanger = false;

  @Input() date?: Date;
  @Output() dateChange = new EventEmitter<Date>();

  @Input() dateRange?: DateRange;
  @Output() dateRangeChange = new EventEmitter<DateRange>();

  @Input() onlyMonthYear: boolean = false;

  @Output() monthChange = new EventEmitter<Date>();

  @Output() delimiter?: DateRange;

  struct?: Date[][];

  showDate: Date = new Date();

  nextIsMin = true;

  editYear = false;

  constructor() { }

  ngOnInit(): void {
    if (this.modeRanger) {
      if (this.dateRange?.min) {
        this.showDate = new Date(this.dateRange?.min);
      }
    } else if(this.date != null) {
      this.showDate = new Date(this.date);
    }
    this.mountStruct();
  }

  get month() {
    return this.showDate.toLocaleString('pt-BR', { month: 'long' });
  }
  get year() {
    return this.showDate.getFullYear();
  }
  set year(newYear) {
    this.showDate = new Date(newYear, this.showDate.getMonth(), this.showDate.getDay());
    // selectDate();
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
    this.monthChange.emit(this.showDate);
    if(this.onlyMonthYear) {
      this.selectDate(this.showDate);
    }
  }
  previousMonth() {
    this.showDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth() - 1, 1);
    this.mountStruct();
    this.monthChange.emit(this.showDate);
    if(this.onlyMonthYear) {
      this.selectDate(this.showDate);
    }
  }

  mountStruct() {

    let struct = [];
    let daysOfWeek = [...Array(7).keys()];
    let currentDate = this.firstDay;
    currentDate.setDate(currentDate.getDate() - this.firstDay.getDay())
    let plusOneDate = () => currentDate.setDate(currentDate.getDate() + 1);
    // let thoseAreDays = true;

    do {
      let week: (Date) [] = [];
      daysOfWeek.forEach((i) => {
        week.push(new Date(currentDate));
        // thoseAreDays = !(currentDate.getMonth() != this.firstDay.getMonth());
        plusOneDate();
      });
      struct.push(week)
    } while (struct.length < 6);

    this.struct = struct;
  }

  selectDate(date: Date) {

    if (this.modeRanger) {
      if (!this.dateRange) {
        this.dateRange = {
          min: date,
        };
        this.nextIsMin = !this.nextIsMin;
      }
      else if (this.nextIsMin) {
        this.dateRange.min = date;
        if ( this.dateRange.max && this.dateRange.min.getTime() > this.dateRange.max.getTime()) {
          this.dateRange.max = undefined;
        }
        this.nextIsMin = !this.nextIsMin;
      }
      else {
        if (this.dateRange.min && this.dateRange.min.getTime() > date.getTime() ) {
          this.dateRange.max = this.dateRange.min;
          this.dateRange.min = date;
        } else {
          this.dateRange.max = date;
          this.nextIsMin = !this.nextIsMin;
        }
      }

      this.dateRangeChange.emit(this.dateRange);
    } else {
      this.date = date;
      this.dateChange.emit(date);
    }

  }

  private equals(dateA : Date, dateB : Date) : Boolean {
    return dateA.getFullYear() == dateB.getFullYear() &&
      dateA.getMonth() == dateB.getMonth() &&
      dateA.getDate() == dateB.getDate();
  }

  private isBetween(date: Date, dateRange: DateRange): Boolean {
    return dateRange.min != undefined && dateRange.min.getTime() < date.getTime() && dateRange.max != undefined && dateRange.max.getTime() > date.getTime();
  }

  isToday(day : Date) {
    return this.equals(this.today,day);
  }
  inDifferentMonthStruct(day : Date) {
    return this.month != day.toLocaleString('pt-BR', { month: 'long' })
  }
  isWeekend(day : Date) {
    return day.getDay() == 0 || day.getDay() == 6;
  }
  isDateSelected(day: Date) {
    if (this.dateRange != null) return false;
    if (this.date == null) return false;
    return this.equals(this.date, day);
  }

  isStartRanger(day: Date) {
    if (this.dateRange == null || this.dateRange.min == undefined) return false;
    return this.equals(day,this.dateRange.min);
  }
  isInsideRanger(day: Date) {
    if (this.dateRange == null) return false;
    return this.isBetween(day, this.dateRange)
  }

  isEndRanger(day: Date) {
    if (this.dateRange == null || this.dateRange.max == undefined) return false;
    return this.equals(day,this.dateRange.max);
  }



}
