import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loginstatus = new BehaviorSubject<boolean>(false);
  currentVariable = this.loginstatus.asObservable();

  // loginstatus:boolean = false;

  constructor(public http: HttpClient, private appsettings: AppSettingsService) { }


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

  // AUTH CHECKING
  get checkAuthStatus() {
    if (this.loginstatus.value) {
      return true;
    } else {
      return false;
    }
  }

}
