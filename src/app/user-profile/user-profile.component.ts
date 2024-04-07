import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {


  // profile
  profileDetails: any = {};

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.profileDetails = this.appService.profileDetails;
  }

}
