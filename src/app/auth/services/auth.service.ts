import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, Subject } from 'rxjs';
import { ShopUser } from '../model/shop-user.model';
import { switchMap, map, startWith, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange$ = new Subject<boolean>();
  currentUser$: Observable<ShopUser>;
  isAdmin$: Observable<boolean>;


  constructor(private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase,
              private router: Router) { }

  initAuth() {
    this.currentUser$ = this.afAuth.authState.pipe(
      switchMap(fbUser => {
        if (fbUser) {
          return this._getUser(fbUser.uid);
        } else {
          return of(null);
        }
      }),
      tap((appUser: firebase.User) => {
        localStorage.setItem('currentUser', JSON.stringify(appUser));
      }),
      startWith(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null)
    );

    this.isAdmin$ = this.currentUser$.pipe(
      map((user: ShopUser) => user ? user.isAdmin : false)
    );

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.authChange$.next(true);
        user.getIdToken().then(authToken => localStorage.setItem('token', authToken));
        this.router.navigate(['products']);
      } else {
        // TODO cancel any subscriptions to data
        localStorage.setItem('token', null);
        this.authChange$.next(false);
        this.router.navigate(['welcome']);
      }
    });

    // auto auth
    const token = localStorage.getItem('token');
    if (token) {
      this.authChange$.next(true);
      this.router.navigate(['products']);
    }
  }

  signInWithGoogle(): Promise<any> {
    return new Promise<any>((resolve, _) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider)
        .then(credentials => {
          this.saveUser(credentials.user);
          resolve();
        });
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }


  saveUser(user: firebase.User) {
    this.afDb.object(`users/${user.uid}`).update({
      name: user.displayName,
      email: user.email,
      isAdmin: false
    });
  }

  private _getUser(uid: string): Observable<ShopUser> {
    return this.afDb.object<ShopUser>(`/users/${uid}`).valueChanges();
  }

}
