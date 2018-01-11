import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../models/episode';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { StoryEvent } from '../models/story-event';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  public seasons: Season[] = [];
  public events: StoryEvent[] = [];
  public special: StoryEvent[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public data: DataService
  ) { }

  ngOnInit() {
    this.seasons = this.data.getSeasons();
    this.events = this.data.getEvents();
    this.special = this.data.getSpecial();
  }

  goChapter(chapter: Chapter) {
    this.router.navigate(['/chapter/', chapter.ref.replace(/\//g, '-')]);
  }

}
