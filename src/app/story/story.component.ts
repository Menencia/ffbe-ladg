import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../models/episode';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  public seasons: Season[] = [];
  public events: Chapter[] = [];
  public special: Chapter[] = [];

  linkWebsite = 'http://www.finalfantasyexvius.com/fr/';
  linkAndroid = 'https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.FFBEWW&hl=fr';
  linkIOS = 'https://itunes.apple.com/fr/app/final-fantasy-brave-exvius/id1078553808?mt=8';

  constructor(
    public http: HttpClient,
    public router: Router,
    public data: DataService
  ) { }

  async ngOnInit() {
    await this.data.ready();
    this.seasons = this.data.getAllSeasons();
    this.events = this.data.getEvents();
    this.special = this.data.getSpecial();
  }

  goChapter(chapter: Chapter) {
    this.router.navigate(['/chapter/', chapter.ref.replace(/\//g, '-')]);
  }

}
