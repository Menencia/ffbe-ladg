import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { HttpClient } from '@angular/common/http';
import { Episode } from '../models/episode';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit {

  public seasons: Season[];
  public storyEvents: Chapter[];
  public specialEvents: Chapter[];

  linkWebsite = 'http://www.finalfantasyexvius.com/fr/';
  linkAndroid = 'https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.FFBEWW&hl=fr';
  linkIOS = 'https://itunes.apple.com/fr/app/final-fantasy-brave-exvius/id1078553808?mt=8';

  constructor(
    public http: HttpClient,
    public router: Router,
    public data: DataService,
  ) { }

  async ngOnInit() {
    this.data.getSeasons().subscribe(seasons => {
      this.seasons = seasons;
    });
    this.data.getStoryEvents().subscribe(storyEvents => {
      this.storyEvents = storyEvents;
    });
    this.data.getSpecialEvents().subscribe(specialEvents => {
      this.specialEvents = specialEvents;
    });
  }

  goChapter(chapter: Chapter) {
    // this.router.navigate(['/chapter/', chapter.ref.replace(/\//g, '-')]);
  }

}
