import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ShopUser } from '../../auth/model/shop-user.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<ShopUser>;
  totalOnCart$: Observable<number>;

  constructor(private auth: AuthService,
              private router: Router,
              private cartSvc: ShoppingCartService) { }

  ngOnInit() {
    this.user$ = this.auth.currentUser$;
    this.totalOnCart$ = this.cartSvc.totalOnCart$;
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
