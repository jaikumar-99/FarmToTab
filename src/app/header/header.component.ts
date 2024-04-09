import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NavigationEnd, Router } from '@angular/router';
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
  urlSubscription: Subscription;

  // profile
  profileDetails: any = {};

  // url details
  currentUrl = ''

  ngOnInit(): void {
    this.profileDetails = this.appservice.profileDetails;
    this.currentUrl = this.router.url;
    console.log('activated route', this.router.url);

    this.traceUrl();

    this.authSubscription = this.appservice.currentVariable.subscribe(value => {
      if (value) {
        this.profileDetails = this.appservice.profileDetails;
      }
    });

    this.profileSubscription = this.appservice.profileDetailsSubject.subscribe((value: any) => {
      if (value.email) {
        this.profileDetails = value;
      }
    });
  }

  traceUrl() {
    this.urlSubscription = this.router.events.subscribe(event => {
      // console.log('url event',url);
      if (event instanceof NavigationEnd) {
        // We've finished navigating
        console.log('Final', event);
        this.currentUrl = event.url;
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
    this.urlSubscription.unsubscribe();
  }
}
