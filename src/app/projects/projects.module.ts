import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ProjectSidebarComponent } from './project-sidebar/project-sidebar.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsListComponent } from './project-sidebar/projects-list/projects-list.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskModalComponent } from './tasks/new-task-modal/new-task-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EditTaskModalComponent } from './tasks/edit-task-modal/edit-task-modal.component';


@NgModule({
  declarations: [
      HomeComponent,
      ProjectSidebarComponent,
      ProjectComponent,
      ProjectsListComponent,
      NewProjectComponent,
      TasksComponent,
      NewTaskModalComponent,
      EditTaskModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DragDropModule
  ]
})
export class ProjectsModule { }
