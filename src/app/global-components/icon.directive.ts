import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Icons } from './Icons.enum';

@Directive({
  selector: '[icon]'
})
export class IconDirective {

  @Input() icon : String | string | Icons = '';

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    if(this.icon) {
      this.el.nativeElement.classList.add("icon-"+this.getValue(this.icon));
    }

  }

  getValue(value: String): String {
    if (!value) return '';
    if(value == value.toUpperCase())
      return Icons[value as keyof typeof Icons];
    else
      return value;
  }

}
