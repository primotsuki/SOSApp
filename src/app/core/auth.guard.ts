import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {userGQL} from '../graphql/user';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: userGQL
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        console.log(currentUser);
        if (currentUser){
            return true;
        }
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}