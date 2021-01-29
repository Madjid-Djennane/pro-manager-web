import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { ApiResult } from '../_models/classes';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
    API_BASE_URL = `${environment.PRO_MANAGER_API_URL}/api/v1/projects`;

    constructor(
        private _http: HttpClient
    ) { }

    public createProject(params): Observable<ApiResult> {
        return this._http.post(`${this.API_BASE_URL}`, params).pipe(
            map((res: ApiResult) => {
                return res;
            })
        );
    }

    public getProject(project_id: string): Observable<Project> {
        return this._http.get(`${this.API_BASE_URL}/${project_id}`).pipe(
            map((res: ApiResult) => {
                return res.data;
            })
        );
    }

}
