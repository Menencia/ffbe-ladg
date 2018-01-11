import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { SpecialEvent } from '../models/special-event';
import { EpisodeSSE } from '../models/episode-sse';

@Component({
  selector: 'app-episode-sse',
  templateUrl: './episode-sse.component.html',
  styleUrls: ['./episode-sse.component.css']
})
export class EpisodeSSEComponent implements OnInit {

  public specialEvent: SpecialEvent;
  public episodeSSE: EpisodeSSE;
  public player: YT.Player;

  constructor(
    public activatedRoute: ActivatedRoute,
    public data: DataService
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
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

}
