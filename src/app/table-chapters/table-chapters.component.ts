import { Component, OnInit, Input } from '@angular/core';
import { Chapter } from '../models/chapter';

import * as _ from 'lodash';

@Component({
  selector: 'app-table-chapters',
  templateUrl: './table-chapters.component.html'
})
export class TableChaptersComponent implements OnInit {

  @Input()
  chapters: Chapter[];

  haveTitles: boolean;

  constructor() { }

  ngOnInit() {
    this.haveTitles = _.every(this.chapters, (chapter) => {
      return chapter.title;
    });
  }

}
