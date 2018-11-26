import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public http: HttpClient) { }

  allReports() {
    return this.http.get(`${environment.endpoint}/histories?token=${localStorage.getItem('token')}`);
  }

  getReportsbyPatient(id: number) {
    return this.http.get(`${environment.endpoint}/user/${id}/histories?token=${localStorage.getItem('token')}`);
  }

  saveReport(data) {
    return this.http.post(`${environment.endpoint}/history?token=${localStorage.getItem('token')}`, data);
  }
}
