import { Component, OnInit } from '@angular/core';
import { SEASONS } from '../data/seasons';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Part } from '../models/part';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  public seasons: Season[];

  constructor() { }

  ngOnInit() {
    const data = SEASONS;
    const seasons = [];
    data.forEach((season: any) => {
      seasons.push(
        Season.load(season)
      );
    });
    this.seasons = seasons;
  }

  seeEpisodes(partOrChapter: Part|Chapter) {
    console.log(partOrChapter.episodes);
  }

}
