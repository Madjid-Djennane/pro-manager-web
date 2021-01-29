import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as projectActions from '../project.actions';
import * as userActions from '../../users/user.action';
import { User } from '../../users/user';
import { Project } from '../project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

interface AppState {
    project: {
        data: Project[];
    };
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    public projects$: Observable<Project[]>;

    constructor(
        private _store: Store<AppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.projects$ = this._store.select(state => state.project.data);
    }

    toTasks(projectId: string): void {
        this._router.navigate([`./${projectId}`], { relativeTo: this._activatedRoute });
    }

}
