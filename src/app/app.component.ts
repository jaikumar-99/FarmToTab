import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(private appservice: AppService, private router: Router) { }
  title = 'FarmToTable';
  showheader: boolean = false;
  variableValue: boolean = false;

  // subscriptions
  authSubscription: Subscription

  ngOnInit() {
    // console.log(environment.apiUrl, environment.production);

    // disabling the console.logs!
    if (environment.production) {
      console.log = () => {
      }
    }
    //
    // sessionStorage.clear();
    // this.router.navigate(['/login']);
    this.authSubscription = this.appservice.currentVariable.subscribe(value => {
      console.log(value, 'variableValue');
      this.variableValue = value;
      this.checklogin(value);
    });
  }

  checklogin(event: boolean) {
    console.log(event, 'app component')
    if (event) {
      this.showheader = true;
    } else {
      this.showheader = false;
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

