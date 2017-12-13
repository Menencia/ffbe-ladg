import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Episode } from '../models/episode';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;
  public episode: Episode;
  public player: YT.Player;

  constructor(
    public activatedRoute: ActivatedRoute,
    public data: DataService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe((params: any) => {
      this.loadEpisode(params.episode);
    });
  }

  loadEpisode(e) {
    const {season, chapter, episode} = this.data.getEpisode(e);
    this.season = season;
    this.chapter = chapter;
    this.episode = episode;
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

}
