import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../models/episode';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  public seasons: Season[] = [];
  public events: Chapter[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public data: DataService
  ) { }

  ngOnInit() {
    this.seasons = this.data.getSeasons();
    this.events = this.data.getEvents();
  }

  goChapter(chapter: Chapter) {
    this.router.navigate(['/chapter/', chapter.ref.replace(/\//g, '-')]);
  }

}
