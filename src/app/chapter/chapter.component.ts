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
  styleUrls: ['chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public data: DataService,
    public router: Router
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

  previous() {
    this.router.navigate(['/chapter/', this.chapter.previousChapter.ref.replace(/\//g, '-')]);
  }

  next() {
    this.router.navigate(['/chapter/', this.chapter.nextChapter.ref.replace(/\//g, '-')]);
  }

  goLink(chapter) {
    const link = 'https://www.youtube.com/playlist?list=' + chapter.yt;
    window.open(link, '_blank');
  }

}
