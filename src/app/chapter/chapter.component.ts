import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chapter } from '../models/chapter';
import { Season } from '../models/season';

import * as _ from 'lodash';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;

  image;

  hasRegions = true;
  hasCorrections = false;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public data: DataService,
    public router: Router,
    public storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.loadChapter(params.chapter);
      });
  }

  async loadChapter(c) {
    // waiting for data service
    await this.data.ready();

    // get needed chapter
    const chapter = this.data.getChapter(c);

    // load image
    this.storage
      .ref('images/ffbe_' + chapter.getRefForUrl().toLowerCase() + '.jpg')
      .getDownloadURL()
      .subscribe(k => {
        this.chapter = chapter;
        this.image = k;
      });

    // shortchut to season
    if (chapter.season) {
      this.season = chapter.season;
    }

    // indicates if we need region column
    this.hasRegions = _.some(chapter.episodes, e => e.region);

    this.hasCorrections = _.some(chapter.episodes, e => e.corrections.length > 0);
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
