import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(private appservice: AppService,private router: Router) {}
  title = 'FarmToTable';
  showheader: boolean = false;
  variableValue: boolean = false;
  ngOnInit() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.appservice.currentVariable.subscribe(value => {
      console.log(value, 'variableValue');
      this.variableValue = value;
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
}

