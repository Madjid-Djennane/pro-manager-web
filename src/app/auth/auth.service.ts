import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../users/user';
import { ApiResult } from '../_models/classes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    API_BASE_URL = `${environment.PRO_MANAGER_API_URL}/api/v1`;

    constructor(
      private jwtHelper: JwtHelperService,
      private _http: HttpClient
    ) { }

    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public createAccount(user: User): Observable<any> {
        return this._http.post(`${this.API_BASE_URL}/users/`, { user });
    }

    public login(params): Observable<ApiResult> {
        return this._http.post(`${this.API_BASE_URL}/users/login`, params).pipe(
            map((res: ApiResult) => {
                localStorage.setItem('token', res.data.token);
                return res;
            })
        );
    }

}
