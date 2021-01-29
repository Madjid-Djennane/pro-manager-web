import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsModule } from './projects.module';
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: ProjectComponent
            },
            {
                path: 'new',
                component: NewProjectComponent
            },
            {
                path: ':project_id',
                component: TasksComponent
            }
        ]
    }
];

@NgModule({
  imports: [ProjectsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
