import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { UsersRoutingModule } from '../users/users-routing.module';
import { ProjectsRoutingModule } from '../projects/projects-routing.module';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
  declarations: [MainComponent, HeaderComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AngularMaterialModule, FlexLayoutModule],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
