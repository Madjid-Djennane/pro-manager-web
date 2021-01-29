import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRootComponent } from './user-root/user-root.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersModule } from './users.module';


const routes: Routes = [
    {
        path: '',
        component: UserRootComponent,
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
  imports: [UsersModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
