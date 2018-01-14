import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../models/chapter';

@Component({
  selector: 'app-table-chapters',
  templateUrl: './table-chapters.component.html'
})
export class TableChaptersComponent implements OnInit {

  @Input()
  chapters: Chapter[];

  constructor() { }

  ngOnInit() {
  }

}
