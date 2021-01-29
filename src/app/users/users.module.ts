import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserRootComponent } from './user-root/user-root.component';
import { ProfileComponent } from './profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [UserRootComponent, ProfileComponent, EditUserComponent],
  imports: [
    CommonModule,
    // UsersRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class UsersModule { }
