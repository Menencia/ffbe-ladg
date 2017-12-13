import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chapter } from '../models/chapter';
import { Season } from '../models/season';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public data: DataService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.loadChapter(params.chapter);
      });
  }

  loadChapter(c) {
    const {season, chapter} = this.data.getChapter(c);
    this.season = season;
    this.chapter = chapter;
  }

}
