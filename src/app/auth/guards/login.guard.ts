import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): boolean | Observable<boolean> {
    return this.auth.currentUser$.pipe(
      map( user => {
        if (!user) {
          return true;
        }

        // else
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
