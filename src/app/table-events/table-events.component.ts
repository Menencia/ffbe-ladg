import { Component, OnInit, Input } from '@angular/core';
import { StoryEvent } from '../models/story-event';

@Component({
  selector: 'app-table-events',
  templateUrl: './table-events.component.html',
  styleUrls: ['./table-events.component.css']
})
export class TableEventsComponent implements OnInit {

  @Input()
  events: StoryEvent[];

  constructor() { }

  ngOnInit() {
  }

}