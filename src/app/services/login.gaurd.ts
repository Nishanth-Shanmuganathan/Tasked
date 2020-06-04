import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.getToken();
    const isAuth = this.authService.token && this.authService.username && this.authService.email ? true : false;
    if (!isAuth) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
    return isAuth;
  }


}
