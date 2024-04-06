import { Injectable } from '@angular/core';
import { environment } from '../environments/environemnt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  apiUrl: string = environment.apiUrl;
  constructor(private router: Router) { }

  APIS = {
    LOGIN_USER: this.apiUrl + '/user/login',
    SIGNUP_USER: this.apiUrl + '/user/signup',
    CREATE_USER: this.apiUrl + '/addUser',
    UPDATE_USER: this.apiUrl + '/updateUser',
    DELETE_USER: this.apiUrl + '/deleteUser',
    GET_USER: this.apiUrl + '/user/getuser',
    GET_CROPS: this.apiUrl + '/getcropslist',
    CREATE_CROP: this.apiUrl + '/addcrop',
    DELETE_CROP: this.apiUrl + '/deletecrop',
  }

}
