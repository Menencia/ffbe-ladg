import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { SpecialEvent } from '../models/special-event';
import { EpisodeSSE } from '../models/episode-sse';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-episode-sse',
  templateUrl: './episode-sse.component.html',
  styleUrls: ['./episode-sse.component.scss']
})
export class EpisodeSSEComponent implements OnInit {

  public specialEvent: SpecialEvent;
  public episodeSSE: EpisodeSSE;
  public episodePrevious: EpisodeSSE;
  public episodeNext: EpisodeSSE;
  public player: YT.Player;

  constructor(
    public activatedRoute: ActivatedRoute,
    public data: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((params: any) => {
      this.loadEpisode(params['episodeSSE']);
    });
  }

  loadEpisode(e) {
    const {specialEvent, episodeSSE} = this.data.getEpisodeSSE(e);
    this.specialEvent = specialEvent;
    this.episodeSSE = episodeSSE;
    this.episodePrevious = this.getPrevious();
    this.episodeNext = this.getNext();
    if (this.player) {
      this.player.cueVideoById(episodeSSE.video.yt);
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
    const episodeIndex = _.findIndex(this.specialEvent.episodes, this.episodeSSE);
    let episodePrevious: EpisodeSSE;
    if (episodeIndex - 1 >= 0) {
      episodePrevious = this.specialEvent.episodes[episodeIndex - 1];
    }
    return episodePrevious;
  }

  getNext() {
    const episodeIndex = _.findIndex(this.specialEvent.episodes, this.episodeSSE);
    let episodeNext: EpisodeSSE;
    if (episodeIndex + 1 < this.specialEvent.episodes.length) {
      episodeNext = this.specialEvent.episodes[episodeIndex + 1];
    }
    return episodeNext;
  }

  previous() {
    if (this.episodePrevious) {
      this.router.navigate(['/episode-sse/', this.episodePrevious.ref.replace(/\//g, '-')]);
    }
  }

  next() {
    if (this.episodeNext) {
      this.router.navigate(['/episode-sse/', this.episodeNext.ref.replace(/\//g, '-')]);
    }
  }

}
