import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  @Input() dictionary?: any;

  constructor() {

  }

  ngOnInit() {

  }

}
