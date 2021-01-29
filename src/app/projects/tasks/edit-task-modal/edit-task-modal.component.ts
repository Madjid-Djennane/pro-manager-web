import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstant } from '../../../_constants/index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';
import { Project } from '../../project';
import { User } from '../../../users/user';
import { Task } from 'src/app/_models/task';


@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent implements OnInit {

    public taskForm: FormGroup;
    public project: Project;
    public task: Task;
    public members: User[];

    public tasksPriority = Object.values(this._appConstants.tasksPriority);
    public tasksCategories = Object.values(this._appConstants.tasksCategories);
    public tasksStatus = Object.values(this._appConstants.tasksStatus);

    constructor(
        private _formBuilder: FormBuilder,
        private _appConstants: AppConstant,
        private _tasksService: TasksService,
        public dialogRef: MatDialogRef<EditTaskModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            task: Task,
            project: Project
        }
    ) {
        this.project = this.data.project;
        this.members = this.project.members;
        this.task = this.data.task;
    }

    ngOnInit(): void {
        this.taskForm = this._formBuilder.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description, Validators.required],
            priority: [this.task.priority, Validators.required],
            assignedTo: [this.task.assignedTo || ''],
            category: [this.task.category, Validators.required],
            project: [this.project._id]
        });
    }

    submit(): void {
        if (!this.taskForm.valid) {
            this.close(false);
        }
        this._tasksService.updateTask(this.task._id, this.taskForm.value).subscribe(
            res => {
                console.log(res);
                this.close({ projectId: this.project._id });
            },
            err => {
                console.log(err);
            }
        );
    }

    close(event): void {
        this.dialogRef.close(event);
    }

}
