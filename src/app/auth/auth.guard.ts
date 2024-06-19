import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}

// Route Protect for Angular 14+ versions - Simply create a function and pass it to canActivate in route module
/* 
import { inject } from "@angular/core";
import { AuthService } from "./Services/auth.service"; 
import { Router } from "@angular/router";

export const CanActivate = () => {
  const authService inject (AuthService); 
  const router inject (Router);
  if(authService.IsAuthenticated()) {
    return true;
  } else{
    router.navigate(['/Login']);
    return false;
  }
}


*/
