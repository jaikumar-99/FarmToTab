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
  return this.http.get(url);
}

changeVariable(value: boolean) {
  this.loginstatus.next(value);
}
getcropslist() {
  const url = this.appsettings.APIS.GET_CROPS;
  return this.http.get(url);
}

createCrop(data: any) {
  const url = this.appsettings.APIS.CREATE_CROP;
  return this.http.post(url,data);
}

deleteCrop(data: any) {
  const url = this.appsettings.APIS.DELETE_CROP;
  return this.http.post(url,data);
}


addUser(data: any) {
  const url = this.appsettings.APIS.CREATE_USER;
  return this.http.post(url,data);
}

updateUser(data: any) {
  const url = this.appsettings.APIS.UPDATE_USER;
  return this.http.post(url,data);
}

deleteUser(data: any) {
  const url = this.appsettings.APIS.DELETE_USER
  return this.http.post(url,data);
}

}
