import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as projectActions from './project.actions';
import * as _ from 'lodash';

@Injectable()
export class ProjectEffect {

    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(projectActions.loadProjects),
        mergeMap(() => this._usersService.getUserProjects(this.jwtHelper.decodeToken(localStorage.getItem('token'))._id)
            .pipe(
                map(res => projectActions.editProjectsData({ data: res.data })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private _usersService: UsersService,
        private jwtHelper: JwtHelperService,
    ) { }
}
