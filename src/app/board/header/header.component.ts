import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../users/user';
import { Router } from '@angular/router';

interface AppState {
    user: {
        data: User
    };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public user$: Observable<User> = this._store.select(state => state.user.data);

    constructor(
        private _store: Store<AppState>,
        private _router: Router
    ) { }

    ngOnInit(): void {
    }

    toUser() {
        this._router.navigate(['/users/profile']);
    }

    toHome() {
        this._router.navigate(['/projects']);
    }

}
