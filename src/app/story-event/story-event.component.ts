import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chapter } from '../models/chapter';
import { Season } from '../models/season';
import { StoryEvent } from '../models/story-event';

@Component({
  selector: 'app-story-event',
  templateUrl: './story-event.component.html',
  styleUrls: ['./story-event.component.css']
})
export class StoryEventComponent implements OnInit {

  public season: Season;
  public storyEvent: StoryEvent;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public data: DataService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.loadStoryEvent(params['storyEvent']);
      });
  }

  loadStoryEvent(c) {
    const {storyEvent} = this.data.getStoryEvent(c);
    this.storyEvent = storyEvent;
  }

}
