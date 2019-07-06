import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Episode } from '../models/episode';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import 'rxjs/add/operator/first';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { Meta } from '@angular/platform-browser';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit, OnDestroy {

  public season: Season;
  public chapter: Chapter;
  public episode: Episode;
  public episodePrevious: Episode;
  public episodeNext: Episode;

  user: User;
  player: YT.Player;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public router: Router,
    public auth: AuthService,
    public afs: AngularFirestore,
    public meta: Meta
  ) {

  }

  async ngOnInit() {
    this.route.params
    .pipe(
      flatMap(params => {
        const tmp = params.ref.split('-');
        const s = tmp.shift();
        const e = tmp.pop();
        const c = tmp.join('-');
        return this.data.getCompleteEpisode(s, c, e);
      })
    )
    .subscribe((episode: Episode) => {
      this.displayEpisode(episode);

      this.meta.updateTag({
        name: 'og:url',
        content: `https://www.youtube.com/watch?v=${episode.video.yt}`
      });
    });

    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.meta.removeTag('name="og:url"');
  }

  displayEpisode(episode) {
    this.episode = episode;

    // shortcut to chapter
    if (this.episode.chapter) {
      this.chapter = this.episode.chapter;
    }

    // shortcut to season
    if (this.chapter.season) {
      this.season = this.chapter.season;
    }

    this.episodePrevious = this.getPrevious();
    this.episodeNext = this.getNext();
    if (this.player) {
      this.player.cueVideoById(this.episode.video.yt);
    }
  }

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  getPrevious() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodePrevious: Episode;
    if (episodeIndex - 1 >= 0) {
      episodePrevious = this.chapter.episodes[episodeIndex - 1];
    } else if (this.season) {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterPrevious: Chapter;
      if (chapterIndex - 1 >= 0) {
        chapterPrevious = this.season.chapters[chapterIndex - 1];
        episodePrevious = _.last(chapterPrevious.episodes);
      }
    }
    return (episodePrevious && episodePrevious.video) ? episodePrevious : null;
  }

  getNext() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodeNext: Episode;
    if (episodeIndex + 1 < this.chapter.episodes.length) {
      episodeNext = this.chapter.episodes[episodeIndex + 1];
    } else if (this.season) {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterNext: Chapter;
      if (chapterIndex + 1 < this.season.chapters.length) {
        chapterNext = this.season.chapters[chapterIndex + 1];
        episodeNext = chapterNext.episodes[0];
      }
    }
    return (episodeNext && episodeNext.video) ? episodeNext : null;
  }

  previous() {
    if (this.episodePrevious) {
      // this.router.navigate(['/episode/', this.episodePrevious.ref.replace(/\//g, '-')]);
    }
  }

  next() {
    if (this.episodeNext) {
      // this.router.navigate(['/episode/', this.episodeNext.ref.replace(/\//g, '-')]);
    }
  }

}
