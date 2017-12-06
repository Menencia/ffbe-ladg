import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Part } from '../models/part';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../models/episode';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  public seasons: Season[] = [];
  public chapters: Chapter[] = [];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadSeasons();
    // this.http.get('data/story-events.json')
    //  .subscribe(data => this.loadEpisodesSE(data));
    /*const seasons = [];
    data.forEach((season: any) => {
      seasons.push(
        Season.load(season)
      );
    });
    this.seasons = seasons;*/
  }

  loadSeasons() {
    this.http.get('data/seasons.json')
      .subscribe((dataSeasons: any[]) => {
        dataSeasons.forEach(d => {
          const season: Season = Season.load(d);
          this.seasons.push(season);
          this.loadChapters(season);
        });
      });
  }

  loadChapters(season: Season) {
    this.http.get(`data/chapters.${season.ref}.json`)
      .subscribe((dataChapters: any[]) => {
        dataChapters.forEach(d => {
          const chapter: Chapter = Chapter.load(d);
          chapter.ref = season.ref + '/' + chapter.ref;
          season.chapters.push(chapter);
          this.loadEpisodes(chapter);
        });
      });
  }

  loadEpisodes(chapter: Chapter) {
    const ref = chapter.ref.replace(/\//g, '-').toLowerCase();
    this.http.get(`data/episodes.${ref}.json`)
      .subscribe((dataEpisodes: any[]) => {
        dataEpisodes.forEach(d => {
          const episode: Episode = Episode.load(d);
          chapter.episodes.push(episode);
        });
      });
  }

  seeEpisodes(chapter: Chapter) {
    // do nothing
  }

}
