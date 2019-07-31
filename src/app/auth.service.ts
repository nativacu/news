import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';


@Injectable({ providedIn: 'root' })
export class AuthService {

    user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {

        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
              if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                // Logged out
                return of(null);
              }
            })
          );

     }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
            this.updateUserData(credential.user);
        });
    }

    emailRegister(email: string, password: string, data: JSON) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
            this.createUser(credential.user, data);
        });
    }

    private createUser(user, data) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        return userRef.set(data, {merge: true});
    }

    public loginMail(email,password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: any = {
            uid: user.uid,
            email: user.email,
            fName: user.fName,
            lName: user.lName
        };
        return userRef.set(data, {merge: true});
    }

     addInfo(data: any) {
        const sub = this.user.subscribe((currUser) => {
            const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${currUser.uid}`);

            return userRef.set(data, {merge: true});
        });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
      }
}
