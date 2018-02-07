import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { User } from './models/user';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  async getUser() {
    return await this.user$.first().toPromise();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        this.updateUser(credential.user);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private updateUser(user) {

    const createData: User = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      admin: false,
      lastConnected: moment().toDate(),
      banned: false
    };
    const updateData = {
      name: user.displayName,
      email: user.email,
      lastConnected: moment().toDate(),
    };

    this.afs.doc(`users/${user.uid}`)
      .update(updateData)
      .then(() => {
        // update successful (document exists)
      })
      .catch((error) => {
        // (document does not exists)
        this.afs.doc(`users/${user.uid}`)
          .set(createData);
      });

  }

}
