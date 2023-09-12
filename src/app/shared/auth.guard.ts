import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // User is authenticated
      if (next.data && next.data['roles']) {
        // If the route has data containing roles, check if the user's role is allowed
        const allowedRoles = next.data['roles'] as string[];
        const userRole = this.authService.isStudent() ? 'student' : 'professor';
        if (allowedRoles.includes(userRole)) {
          return true; // User's role is allowed, allow navigation
        } else {
          // User's role is not allowed, redirect to some error page or show a message
          return this.router.parseUrl('/unauthorized'); // Replace 'unauthorized' with your unauthorized page route
        }
      } else {
        // If the route does not have any role restrictions, allow navigation
        return true;
      }
    } else {
      // User is not authenticated, redirect to login page
      return this.router.parseUrl('/sign-in');
    }
  }
}