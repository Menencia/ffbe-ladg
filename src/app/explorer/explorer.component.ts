import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
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
  }

  loadSeasons() {
    this.http.get('data/seasons.json')
      .subscribe((dataSeasons: any[]) => {
        dataSeasons.forEach(d => {
          const season: Season = Season.load(d);
          this.seasons.push(season);
          if (!d['no-chapters']) {
            this.loadChapters(season);
          }
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
          if (!d['no-episodes']) {
            this.loadEpisodes(chapter);
          }
        });
      });
  }

  loadEpisodes(chapter: Chapter) {
    const ref = chapter.ref.replace(/\//g, '-').toLowerCase();
    this.http.get(`data/episodes.${ref}.json`)
      .subscribe((dataEpisodes: any[]) => {
        dataEpisodes.forEach((d, index) => {
          const episode: Episode = Episode.load(d);
          episode.ref = chapter.ref + '/' + index;
          chapter.episodes.push(episode);
        });
      });
  }

  seeEpisodes(chapter: Chapter) {
    // do nothing
  }

}
