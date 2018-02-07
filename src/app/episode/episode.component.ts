import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Season } from '../models/season';
import { Chapter } from '../models/chapter';
import { Episode } from '../models/episode';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Correction } from '../models/correction';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'rxjs/add/operator/first';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  public season: Season;
  public chapter: Chapter;
  public episode: Episode;
  public episodePrevious: Episode;
  public episodeNext: Episode;
  public player: YT.Player;

  private correctionsCollection: AngularFirestoreCollection<Correction>;
  corrections: Observable<Correction[]>;
  form: Correction = new Correction();
  user: User;

  displayForm = false;
  titleForm: string;
  errorsForm: string[];
  msg: string;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public router: Router,
    public auth: AuthService,
    public afs: AngularFirestore
  ) {
    route.params.subscribe((params: any) => {
      this.loadEpisode(params.episode);

      const options =  ref => ref.where('ref', '==', this.episode.ref).where('verified', '==', true);
      this.correctionsCollection = afs.collection<Correction>('corrections', options);
      this.corrections = this.correctionsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const doc = a.payload.doc;
          return Object.assign({ id: doc.id }, doc.data()) as Correction;
        });
      });
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  canAdd() {
    // connected
    return this.user && !this.user.banned;
  }

  canEdit() {
    // connected & admin role
    return this.user && this.user.admin;
  }

  canDelete() {
    // connected & admin role
    return this.user && this.user.admin;
  }

  toggleForm(state) {
    this.displayForm = state;
    this.errorsForm = [];
  }

  clearMsg() {
    this.msg = null;
  }

  addCorrection(correction) {
    this.titleForm = 'Ajouter une correction';
    this.toggleForm(true);
  }

  async _addCorrection() {

    // checkings
    this.errorsForm = [];
    const {title, message, note} = this.form;
    const regex = /\d{1,2}:\d{2}/;
    if (!this.form.timecode) {
      const error = 'Il faut remplir le champ Timecode';
      this.errorsForm.push(error);
    } else if (!regex.test(this.form.timecode)) {
      const error = 'Le champ Timecode doit être au format "X:YY" (Exemple : "1:08")';
      this.errorsForm.push(error);
    }
    if (!_.some([title, message, note])) {
      const error = 'Il faut remplir au moins l\'un des 3 champs (Auteur, Réplique, Notes)';
      this.errorsForm.push(error);
    }

    if (this.errorsForm.length > 0) {
      return false;
    }

    // confirmation
    if (!confirm('Confirmation ?')) {
      return false;
    }

    if (this.canEdit() && this.form.id) { // update
      const c = this.afs.doc<Correction>('corrections/' + this.form.id);
      c.update({
        timecode: this.form.timecode,
        title: this.form.title ? this.form.title : null,
        message: this.form.message ? this.form.message : null,
        note: this.form.note ? this.form.note : null,
        updated: {author: this.user.name, date: moment().toDate()},
      });
      this.msg = 'Correction modifiée !';
    } else if (this.canAdd() && !this.form.id) { // creation
      this.correctionsCollection.add({
        ref: this.episode.ref,
        timecode: this.form.timecode,
        title: this.form.title ? this.form.title : null,
        message: this.form.message ? this.form.message : null,
        note: this.form.note ? this.form.note : null,
        verified: this.user.admin,
        created: {author: this.user.name, date: moment().toDate()},
      });
      this.msg = this.user.admin ? 'Correction ajoutée' : `Merci d'avoir proposé cette correction.
      Attendez qu'un admin la valide pour qu'elle apparaisse en ligne.`;
    } else {
      this.msg = 'Vous n\'avez pas les droits !';
    }

    this.toggleForm(false);
  }

  editCorrection(correction) {
    this.titleForm = 'Éditer une correction';
    this.form = _.clone(correction);
    this.toggleForm(true);
  }

  deleteCorrection(correction) {
    if (this.canDelete() && confirm('Confirmation ?')) {
      const c = this.afs.doc<Correction>('corrections/' + correction.id);
      c.delete();
    }
  }

  loadEpisode(e) {
    this.episode = this.data.getEpisode(e);
    if (this.episode.chapter) {
      this.chapter = this.episode.chapter;
    }
    if (this.chapter.season) {
      this.season = this.chapter.season;
    }
    this.episodePrevious = this.getPrevious();
    this.episodeNext = this.getNext();
    if (this.player) {
      this.player.cueVideoById(this.episode.video.yt);
    }
  }

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  getPrevious() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodePrevious: Episode;
    if (episodeIndex - 1 >= 0) {
      episodePrevious = this.chapter.episodes[episodeIndex - 1];
    } else if (this.season) {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterPrevious: Chapter;
      if (chapterIndex - 1 >= 0) {
        chapterPrevious = this.season.chapters[chapterIndex - 1];
        episodePrevious = _.last(chapterPrevious.episodes);
      }
    }
    return episodePrevious;
  }

  getNext() {
    const episodeIndex = _.findIndex(this.chapter.episodes, this.episode);
    let episodeNext: Episode;
    if (episodeIndex + 1 < this.chapter.episodes.length) {
      episodeNext = this.chapter.episodes[episodeIndex + 1];
    } else if (this.season) {
      const chapterIndex = _.findIndex(this.season.chapters, this.chapter);
      let chapterNext: Chapter;
      if (chapterIndex + 1 < this.season.chapters.length) {
        chapterNext = this.season.chapters[chapterIndex + 1];
        episodeNext = chapterNext.episodes[0];
      }
    }
    return episodeNext;
  }

  previous() {
    if (this.episodePrevious) {
      this.router.navigate(['/episode/', this.episodePrevious.ref.replace(/\//g, '-')]);
    }
  }

  next() {
    if (this.episodeNext) {
      this.router.navigate(['/episode/', this.episodeNext.ref.replace(/\//g, '-')]);
    }
  }

  goLink(episode) {
    const link = 'https://www.youtube.com/watch?v=' + episode.video.yt + '&list=' + episode.chapter.yt;
    window.open(link, '_blank');
  }

}
