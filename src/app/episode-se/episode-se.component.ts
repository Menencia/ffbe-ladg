import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { StoryEvent } from '../models/story-event';
import { EpisodeSE } from '../models/episode-se';

@Component({
  selector: 'app-episode-se',
  templateUrl: './episode-se.component.html',
  styleUrls: ['./episode-se.component.css']
})
export class EpisodeSEComponent implements OnInit {

  public storyEvent: StoryEvent;
  public episodeSE: EpisodeSE;
  public player: YT.Player;

  constructor(
    public activatedRoute: ActivatedRoute,
    public data: DataService
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
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

}
