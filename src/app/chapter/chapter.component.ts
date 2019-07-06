import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chapter } from '../models/chapter';
import { Season } from '../models/season';

import * as _ from 'lodash';
import { AngularFireStorage } from 'angularfire2/storage';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;

  hasRegions = false;
  hasVersion = false;
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
    this.activatedRoute.params.pipe(
      // example ref: 1-1-1, SE-01
      flatMap(params => {
        const [s, ...tmp] = params.ref.split('-');
        const c = tmp.join('-');
        return this.data.getCompleteChapter(s, c);
      })
    ).subscribe(chapter => {
      this.displayChapter(chapter);
    });
  }

  displayChapter(chapter) {
    // load image
    this.chapter = chapter;

    // shortchut to season
    if (this.chapter.season) {
      this.season = this.chapter.season;
    }

    // indicates if we need region column
    this.hasRegions = _.some(this.chapter.episodes, e => e.region);

    // indicates if we need version column
    this.hasVersion = _.some(this.chapter.episodes, e => e.video && parseInt(e.video.version, 10) < 5);

    this.hasCorrections = _.some(this.chapter.episodes, e => e.corrections.length > 0);
  }

  previous() {
    // this.router.navigate(['/chapter/', this.chapter.previousChapter.ref.replace(/\//g, '-')]);
  }

  next() {
    // this.router.navigate(['/chapter/', this.chapter.nextChapter.ref.replace(/\//g, '-')]);
  }

}
