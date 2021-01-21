import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectHomeComponent } from './project-home/project-home.component';



@NgModule({
  declarations: [ProjectHomeComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class ProjectsModule { }
