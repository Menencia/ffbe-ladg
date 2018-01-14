import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { StoryEvent } from '../models/story-event';
import { EpisodeSE } from '../models/episode-se';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-episode-se',
  templateUrl: './episode-se.component.html',
  styleUrls: ['./episode-se.component.scss']
})
export class EpisodeSEComponent implements OnInit {

  public storyEvent: StoryEvent;
  public episodeSE: EpisodeSE;
  public episodePrevious: EpisodeSE;
  public episodeNext: EpisodeSE;
  public player: YT.Player;

  constructor(
    public activatedRoute: ActivatedRoute,
    public data: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((params: any) => {
      this.loadEpisode(params['episodeSE']);
    });
  }

  loadEpisode(e) {
    const {storyEvent, episodeSE} = this.data.getEpisodeSE(e);
    this.storyEvent = storyEvent;
    this.episodeSE = episodeSE;
    this.episodePrevious = this.getPrevious();
    this.episodeNext = this.getNext();
    if (this.player) {
      this.player.cueVideoById(episodeSE.video.yt);
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
    const episodeIndex = _.findIndex(this.storyEvent.episodes, this.episodeSE);
    let episodePrevious: EpisodeSE;
    if (episodeIndex - 1 >= 0) {
      episodePrevious = this.storyEvent.episodes[episodeIndex - 1];
    }
    return episodePrevious;
  }

  getNext() {
    const episodeIndex = _.findIndex(this.storyEvent.episodes, this.episodeSE);
    let episodeNext: EpisodeSE;
    if (episodeIndex + 1 < this.storyEvent.episodes.length) {
      episodeNext = this.storyEvent.episodes[episodeIndex + 1];
    }
    return episodeNext;
  }

  previous() {
    if (this.episodePrevious) {
      this.router.navigate(['/episode-se/', this.episodePrevious.ref.replace(/\//g, '-')]);
    }
  }

  next() {
    if (this.episodeNext) {
      this.router.navigate(['/episode-se/', this.episodeNext.ref.replace(/\//g, '-')]);
    }
  }

}
