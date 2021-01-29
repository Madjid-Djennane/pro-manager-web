import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstant } from '../../../_constants/index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../project';
import { User } from '../../../users/user';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {

    public taskForm: FormGroup;
    public project: Project;
    public members: User[];

    public tasksPriority = Object.values(this._appConstants.tasksPriority);
    public tasksCategories = Object.values(this._appConstants.tasksCategories);
    public tasksStatus = Object.values(this._appConstants.tasksStatus);

    constructor(
        private _formBuilder: FormBuilder,
        private _appConstants: AppConstant,
        private _tasksService: TasksService,
        public dialogRef: MatDialogRef<NewTaskModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            project: Project,
        }
    ) {
        this.project = this.data.project;
        this.members = this.project.members;
    }

    ngOnInit(): void {
        this.taskForm = this._formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            priority: ['', Validators.required],
            assignedTo: [''],
            category: ['', Validators.required],
            status: [this._appConstants.tasksStatus.PENDING],
            project: [this.project._id]
        });
    }

    submit(): void {
        if (!this.taskForm.valid) {
            this.close(false);
        }
        this._tasksService.addTask(this.taskForm.value).subscribe(
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
