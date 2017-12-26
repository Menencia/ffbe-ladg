import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Episode } from '../models/episode';

import * as _ from 'lodash';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {

  public season: Season;
  public chapter: Chapter;
  public episode: Episode;
  public episodePrevious: Episode;
  public episodeNext: Episode;
  public player: YT.Player;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public router: Router
  ) { 
    route.params.subscribe((params: any) => {
      this.loadEpisode(params.episode);
    });
  }

  loadEpisode(e) {
    const {season, chapter, episode} = this.data.getEpisode(e);
    this.season = season;
    this.chapter = chapter;
    this.episode = episode;
    this.episodePrevious = this.getPrevious();
    this.episodeNext = this.getNext();
    if (this.player) {
      this.player.cueVideoById(episode.video.yt);
    }
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  getPrevious() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodePrevious: Episode;
    if (episodeIndex-1 >= 0) {
      episodePrevious = this.chapter.episodes[episodeIndex-1];
    } else {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterPrevious: Chapter;
      if (chapterIndex-1 >= 0) {
        chapterPrevious = this.season.chapters[chapterIndex-1];
        episodePrevious = _.last(chapterPrevious.episodes);
      }
    }
    return episodePrevious;
  }
  
  getNext() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodeNext: Episode;
    if (episodeIndex+1 < this.chapter.episodes.length) {
      episodeNext = this.chapter.episodes[episodeIndex+1];
    } else {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterNext: Chapter;
      if (chapterIndex+1 < this.season.chapters.length) {
        chapterNext = this.season.chapters[chapterIndex+1];
        episodeNext = chapterNext.episodes[0];
      }
    }
    return episodeNext;
  }

  previous() {
    if (this.episodePrevious) {
      this.router.navigate(['/episode/', this.episodePrevious.ref.replace(/\//g, '-')]);
    }
  }

  next() {
    if (this.episodeNext) {
      this.router.navigate(['/episode/', this.episodeNext.ref.replace(/\//g, '-')]);
    }
  }

}
