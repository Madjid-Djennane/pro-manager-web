import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UsersRoutingModule } from '../users/users-routing.module';
import { ProjectsRoutingModule } from '../projects/projects-routing.module';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'projects',
            },
            {
                path: 'projects',
                loadChildren: () => ProjectsRoutingModule
            },
            {
                path: 'users',
                loadChildren: () =>  UsersRoutingModule
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
