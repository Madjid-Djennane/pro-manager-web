import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as userActions from '../users/user.action';
import * as projectActions from '../projects/project.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _store: Store
        ) {}

    canActivate() {
        if (!this._authService.isAuthenticated()) {
            this._router.navigate(['auth/login']);
            return false;
        }
        this._store.dispatch({ type: userActions.loadUser.type });
        this._store.dispatch({ type: projectActions.loadProjects.type });
        return true;
    }

}
