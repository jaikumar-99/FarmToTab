import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private appservice: AppService, public router: Router) { }

  // subscriptions
  authSubscription: Subscription
  profileSubscription: Subscription

  // profile
  profileDetails: any = {};

  ngOnInit(): void {
    this.authSubscription = this.appservice.currentVariable.subscribe(value => {
      if (value) {
        this.profileDetails = this.appservice.profileDetails;
      }
    });

    this.profileSubscription = this.appservice.profileDetailsSubject.subscribe((value: any) => {
      if (value.email) {
        this.profileDetails = this.appservice.profileDetails;
      }
    });
  }

  checklogout() {
    this.appservice.changeVariable(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }
}
