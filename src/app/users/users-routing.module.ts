import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRootComponent } from './user-root/user-root.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {
        path: '',
        component: UserRootComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
