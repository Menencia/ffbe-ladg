import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QueryFn } from 'angularfire2/firestore';
import { User } from '../models/user';
import { Correction } from '../models/correction';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public collectionUsers;
  public users;
  public collectionCorrections;
  public corrections;
  public collectionVerifiedCorrections;
  public verifiedCorrections;
  public user: User;

  constructor(
    public auth: AuthService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.loadUsers();
    this.loadCorrections();
    this.loadVerifiedCorrections();
  }

  loadUsers() {
    const options: QueryFn = (ref) => ref.limit(5).orderBy('lastConnected', 'desc');
    this.collectionUsers = this.afs.collection<User>('users', options);
    this.users = this.collectionUsers.snapshotChanges().map(actions => {
      return actions.map(a => {
        const doc = a.payload.doc;
        return Object.assign({ id: doc.id }, doc.data()) as User;
      });
    });
  }

  loadCorrections() {
    const options: QueryFn = (ref) => ref.where('verified', '==', false).orderBy('created.date', 'desc');
    this.collectionCorrections = this.afs.collection<Correction>('corrections', options);
    this.corrections = this.collectionCorrections.snapshotChanges().map(actions => {
      return actions.map(a => {
        const doc = a.payload.doc;
        return Object.assign({ id: doc.id }, doc.data()) as Correction;
      });
    });
  }

  loadVerifiedCorrections() {
    const options: QueryFn = (ref) => {
      return ref
        .where('verified', '==', true)
        .limit(5)
        .orderBy('created.date', 'desc');
    };
    this.collectionVerifiedCorrections = this.afs.collection<Correction>('corrections', options);
    this.verifiedCorrections = this.collectionVerifiedCorrections.snapshotChanges().map(actions => {
      return actions.map(a => {
        const doc = a.payload.doc;
        return Object.assign({ id: doc.id }, doc.data()) as Correction;
      });
    });
  }

  id(value) {
    return value.replace(/\//g, '-');
  }

  canVerify() {
    return this.user && this.user.admin;
  }

  canDelete() {
    return this.user && this.user.admin;
  }

  verifyCorrection(e) {
    const c = this.afs.doc<Correction>('corrections/' + e.id);
    c.update({
      verified: true
    });
  }

  deleteCorrection(e) {
    const c = this.afs.doc<Correction>('corrections/' + e.id);
    c.delete();
  }

}
