import { Injectable } from '@angular/core';
import { environment } from '../environments/environemnt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  apiUrl: string = environment.apiUrl;
  constructor(private router: Router, private httpClient: HttpClient) { }

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

  requestServer(body: any, url: string) {
    // const encData = { stinky: this.encrypt(body) };
    const encData = body;

    return this.httpClient.post(url, encData).pipe(
      map((response: any) => {
        console.log('response', response);
        if (response.statusCode === 401) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
        // response = this.decrypt(response.spicy);
        // response = response;
        return response;
      })
    );
  }
}
