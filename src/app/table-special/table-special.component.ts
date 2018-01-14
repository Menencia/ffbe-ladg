import { Component, OnInit, Input } from '@angular/core';
import { SpecialEvent } from '../models/special-event';

@Component({
  selector: 'app-table-special',
  templateUrl: './table-special.component.html'
})
export class TableSpecialComponent implements OnInit {

  @Input()
  special: SpecialEvent[];

  constructor() { }

  ngOnInit() {
  }

}