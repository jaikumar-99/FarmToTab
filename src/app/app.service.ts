import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loginstatus = new BehaviorSubject<boolean>(false);
  currentVariable = this.loginstatus.asObservable();

  // loginstatus:boolean = false;

  // global accessing values
  profileDetails: any = {};
  profileDetailsSubject = new BehaviorSubject({});


  constructor(public http: HttpClient, private appsettings: AppSettingsService, private router: Router) {
    if (sessionStorage.getItem('access_token')) {
      this.getLoggedInUserDetails({}).subscribe({
        next: (response: any) => {
          if (response && response.success) {
            this.profileDetails = response.data;
            this.profileDetailsSubject.next(this.profileDetails);

            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('role', response.data.role);
            this.changeVariable(true);

            if (response.data.role === 1) {
              this.router.navigate(['/user-profile']);
            } else if (response.data.role === 3) {
              this.router.navigate(['/users']);
            }
          }
        }
      });
    }
  }


  getuserslist() {
    const url = this.appsettings.APIS.GET_USER;
    return this.appsettings.requestServer({}, url);
  }

  changeVariable(value: boolean) {
    this.loginstatus.next(value);
  }

  getcropslist() {
    const url = this.appsettings.APIS.GET_CROPS;
    return this.appsettings.requestServer({}, url);
  }

  createCrop(data: any) {
    const url = this.appsettings.APIS.CREATE_CROP;
    return this.appsettings.requestServer({}, url);
  }

  deleteCrop(data: any) {
    const url = this.appsettings.APIS.DELETE_CROP;
    return this.appsettings.requestServer(data, url);
  }

  // User Login
  loginUser(data: any) {
    const url = this.appsettings.APIS.LOGIN_USER;
    return this.appsettings.requestServer(data, url);
  }

  singUpUser(data: any) {
    const url = this.appsettings.APIS.SIGNUP_USER;
    return this.appsettings.requestServer(data, url);
  }

  updateUser(data: any) {
    const url = this.appsettings.APIS.UPDATE_USER;
    return this.appsettings.requestServer(data, url);
  }

  deleteUser(data: any) {
    const url = this.appsettings.APIS.DELETE_USER
    return this.appsettings.requestServer(data, url);
  }

  getLoggedInUserDetails(data: any) {
    const url = this.appsettings.APIS.GET_USER_DETAILS;
    return this.appsettings.requestServer(data, url)
  }

  // udpate user profile
  updateProfile(data: any) {
    const url = this.appsettings.APIS.UPDATE_PROFILE_DETAILS;
    return this.appsettings.requestServer(data, url)
  }

  // AUTH CHECKING
  get checkAuthStatus() {
    if (this.loginstatus.value) {
      return true;
    } else {
      return false;
    }
  }

}
