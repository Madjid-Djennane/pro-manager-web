import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    opened = true;
    over = 'side';
    expandHeight = '42px';
    collapseHeight = '42px';
    displayMode = 'flat';

    watcher: Subscription;

    constructor(
        private media: MediaObserver
    ) {}

    ngOnInit(): void {
        this.watcher = this.media.media$.subscribe((change: MediaChange) => {
            if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
              this.opened = false;
              this.over = 'over';
            } else {
              this.opened = true;
              this.over = 'side';
            }
          });
    }

    toggle() {
        this.over = this.opened ? 'over' : 'side';
        this.opened = !this.opened;
    }

}
