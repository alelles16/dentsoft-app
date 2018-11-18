import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${environment.endpoint}/user_consultory`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.endpoint}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  whoami() {
    return this.http.get(`${environment.endpoint}/me?token=${localStorage.getItem('token')}`);
  }
}
