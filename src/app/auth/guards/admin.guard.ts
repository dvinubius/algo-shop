import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.auth.currentUser$.pipe(
      map(user => {
        if (!user || !user.isAdmin) {
          this.router.navigate(['login'], {
            queryParams: {
              returnUrl: state.url
            }
          });
          return false;
        }

        // else
        return true;
      })
    );
  }
}
