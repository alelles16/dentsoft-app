import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultoryService {

  constructor(public http: HttpClient) { }

  getConsultoryByUser(id: number) {
    return this.http.get(`${environment.endpoint}/consultory_user/${id}?token=${localStorage.getItem('token')}`);
  }

  getStatistics(){
    const id = JSON.parse(localStorage.getItem('consultory')).id;
    return this.http.get(`${environment.endpoint}/consultory/${id}/statistics`);
  }
}
