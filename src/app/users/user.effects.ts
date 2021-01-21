import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsersService } from './users.service';
import * as userActions from './user.action';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

@Injectable()
export class UserEffect {

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loadUser),
        mergeMap(() => this._usersService.getUser(this.jwtHelper.decodeToken(localStorage.getItem('token'))._id)
            .pipe(
                map(user => userActions.editUserInfos({ infos: user })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private _usersService: UsersService,
        private jwtHelper: JwtHelperService,
    ) { }
}
