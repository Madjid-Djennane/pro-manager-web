import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../users/user';
import { ApiResult } from '../_models/classes';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    API_BASE_URL = `${environment.PRO_MANAGER_API_URL}/api/v1/users`;

    constructor(
        private _http: HttpClient
    ) { }

    getUser(user_id: string): Observable<User> {
        return this._http.get(`${this.API_BASE_URL}/${user_id}`)
            .pipe(
                map((res: ApiResult) => {
                    return new User(res.data);
                })
            );
    }
}
