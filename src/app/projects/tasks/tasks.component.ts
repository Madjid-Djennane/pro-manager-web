import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { tap, map } from 'rxjs/operators';
import { Project } from '../project';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectsService } from '../projects.service';
import { Task } from '../../_models/task';
import { TasksService } from './tasks.service';
import Swal from 'sweetalert2';

interface AppState {
    project: {
        data: Project[];
    };
}

export class Tasks {
    pending: Task[] = [];
    in_progress: Task[] = [];
    review: Task[] = [];
    completed: Task[] = [];
    wont_fix: Task[] = [];
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    public projectId: string;
    public project$: Observable<Project>;
    public tasks: Tasks;

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<AppState>,
        public dialog: MatDialog,
        public _projectsService: ProjectsService,
        private _tasksService: TasksService
    ) {
        this.setProject();
    }

    ngOnInit(): void {
        this.setProject();
        this.initTasks();
    }

    initTasks() {
        this.tasks = {
            pending: [],
            in_progress: [],
            review: [],
            completed: [],
            wont_fix: []
        };
        this.project$.subscribe(project => {
            this.tasks.pending = project.tasks.filter(t => t.status === 'pending');
            this.tasks.in_progress = project.tasks.filter(t => t.status === 'in_progress');
            this.tasks.review = project.tasks.filter(t => t.status === 'review');
            this.tasks.completed = project.tasks.filter(t => t.status === 'completed');
            this.tasks.wont_fix = project.tasks.filter(t => t.status === 'wont_fix');
        });
    }

    setProject(): void {
        this._route.paramMap.pipe(
            filter(params => !!params),
            tap(params => {
                this.project$ = this._projectsService.getProject(params.get('project_id'));
            })
        ).subscribe();
    }

    newTask(project: Project): void {
        this.dialog.open(NewTaskModalComponent, {
            width: '700px',
            height: '600px',
            data: {
                project
            }
        }).afterClosed()
        .subscribe(res => {
            if (res) {
                this.initTasks();
                // this.project$ = this._projectsService.getProject(res.projectId);
            }
        });
    }

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                              event.container.data,
                              event.previousIndex,
                              event.currentIndex);

            const task = this.findUpdatedTask(this.tasks);
            this._tasksService.updateTask(task[0].id, { status: task[0].status }).subscribe(
                res => this.initTasks()
            );
        }
    }

    findUpdatedTask(current: Tasks) {
        const status = Object.keys(current);
        return status.map(el => {
            const tasks = current[el];
            const changed = tasks.find(task => task.status !== el);
            if (changed) {
                return { id: changed._id, status: el };
            }
        }).filter(res => !!res);
    }

    getChipColor(param: string) {
        switch (param) {
            case 'bug':
            case 'high':
                return 'warn';

            case 'improvement':
            case 'medium':
                return 'primary';

            case 'low':
            case 'feature':
                return 'accent';
        }
    }

    update(task: Task, project: string) {
        this.dialog.open(EditTaskModalComponent, {
            width: '700px',
            height: '600px',
            data: {
                task,
                project
            }
        }).afterClosed()
        .subscribe(res => {
            if (res) {
                this.initTasks();
                // this.project$ = this._projectsService.getProject(res.projectId);
            }
        });
    }

}
