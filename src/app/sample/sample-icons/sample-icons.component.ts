import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/global-components/Icons.enum';

@Component({
  selector: 'app-sample-icons',
  templateUrl: './sample-icons.component.html',
  styleUrls: ['./sample-icons.component.scss']
})
export class SampleIconsComponent implements OnInit {

  icons: Array<String> = [];
  iconsValue: Array<Icons> = [];

  constructor() {
    for (var icon in Icons) {
      this.icons.push(icon);
      var iconn: Icons = icon as Icons;
      // var valor = Icons[iconn];
      this.iconsValue.push(iconn);
    }
  }

  ngOnInit() {
  }

  getValue(value: String): String {
    return Icons[value as keyof typeof Icons];
  }
}
