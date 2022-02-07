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
  @Input() onlyMonthYear: boolean = false;

  @Output() dateChange = new EventEmitter<Date>();
  @Output() monthChange = new EventEmitter<Date>();

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
    return this.showDate.toLocaleString('pt-BR', { month: 'long' });
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
    this.monthChange.emit(this.showDate);
  }
  previousMonth() {
    this.showDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth() - 1, 1);
    this.mountStruct();
    this.monthChange.emit(this.showDate);
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
    } while (struct.length < 6);

    this.struct = struct;
  }

  selectDate(date : Date) {
    this.date = date;
    this.dateChange.emit(date);
  }

  private equals(dateA : Date, dateB : Date) : Boolean {
    return dateA.getFullYear() == dateB.getFullYear() &&
      dateA.getMonth() == dateB.getMonth() &&
      dateA.getDate() == dateB.getDate();
  }

  private isBetween(date: Date, dateRanger: DateRanger): Boolean {
    return dateRanger.min.getTime() < date.getTime() && dateRanger.max.getTime() > date.getTime();
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
    if (this.dateRange == null) return false;
    return this.equals(day,this.dateRange.min);
  }
  isInsideRanger(day: Date) {
    if (this.dateRange == null) return false;
    return this.isBetween(day, this.dateRange)
  }

  isEndRanger(day: Date) {
    if (this.dateRange == null) return false;
    return this.equals(day,this.dateRange.max);
  }



}
