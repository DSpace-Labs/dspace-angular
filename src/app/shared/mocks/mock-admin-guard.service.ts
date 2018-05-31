import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { hasValue } from '../empty.util';

@Injectable()
export class MockAdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if being run in browser, enforce 'isAdmin' requirement
    if (typeof window === 'object' && hasValue(window.localStorage)) {
      if (window.localStorage.getItem('isAdmin') === 'true') {
        return true;
      }
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
