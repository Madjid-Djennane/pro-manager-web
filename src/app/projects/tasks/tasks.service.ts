import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResult } from '../../_models/classes';
import { Task } from '../../_models/task';

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    API_BASE_URL = `${environment.PRO_MANAGER_API_URL}/api/v1/tasks`;

    constructor(
        private _http: HttpClient
    ) { }

    public addTask(task: Task): Observable<ApiResult> {
        return this._http.post(`${this.API_BASE_URL}`, task).pipe(
            map((res: ApiResult) => {
                return res;
            })
        );
    }

    public updateTask(taskId: string, params: any) {
        return this._http.put(`${this.API_BASE_URL}/${taskId}`, params);
    }


}
