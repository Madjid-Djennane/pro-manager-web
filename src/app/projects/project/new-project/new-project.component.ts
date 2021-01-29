import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ProjectsService } from '../../projects.service';
import { UsersService } from '../../../users/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as projectActions from '../../project.actions';

export interface SelectedMembers {
    name: string;
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    public selectedMembers: SelectedMembers[] = [];

    public projectForm: FormGroup;
    public options = [];
    filteredOptions: Observable<string[]>;
    membersControl = new FormControl([' ']);
    constructor(
        private _formBuilder: FormBuilder,
        private _projectsService: ProjectsService,
        private _usersService: UsersService,
        private _router: Router,
        private _store: Store
    ) { }

    ngOnInit() {
        this.initUsersEmail();
        this.projectForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });

        this.filteredOptions = this.membersControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    add(value: string): void {
        if ((value || '').trim()) {
            this.selectedMembers.push({name: value.trim()});
        }
    }

    remove(member: SelectedMembers): void {
      const index = this.selectedMembers.indexOf(member);
      if (index >= 0) {
        this.selectedMembers.splice(index, 1);
      }
    }

    submit() {
        if (!this.projectForm.valid) {
            return;
        }
        const newProject = Object.assign({
            ...this.projectForm.value,
            members: this.selectedMembers.map(m => m.name)
        });

        this._projectsService.createProject(newProject).subscribe(
            res => {
                this._store.dispatch({ type: projectActions.loadProjects.type });
                this._router.navigate(['/']);
            },
            err => {
                Swal.fire({
                    title: 'Erreur',
                    icon: 'error',
                    text: 'Erreur inconnue !'
                });
            }
        );

    }

    initUsersEmail() {
        this._usersService.getUsers().subscribe(
            res => {
                this.options = res.data.map(u => u.email);
            },
            err => {
                this.options = [];
            }
        );
    }


}
