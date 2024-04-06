import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private appservice: AppService,public router: Router) {}
  checklogout() {
    sessionStorage.removeItem('login');
    this.appservice.changeVariable(false);
    this.router.navigate(['/login']);
  }

}
