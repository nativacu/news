import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


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
                return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
              } else {
                // Logged out
                return of(null);
              }
            })
          );

     }


    public emailRegister(email: string, password: string, data: any) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
            this.createUser(credential.user, data);
        });
    }

    private createUser(user, data) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
        return userRef.set(data, {merge: true});
    }

    public loginMail(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

     addInfo(data: any) {
        const sub = this.user.subscribe((currUser) => {
            const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${currUser.uid}`);
            return userRef.set(data, {merge: true});
        });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
      }
}
