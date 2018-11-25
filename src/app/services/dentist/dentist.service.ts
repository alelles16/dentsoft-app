import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  constructor(public http: HttpClient) { }

  newDentist(data: any) {
    return this.http.post(`${environment.endpoint}/dentist?token=${localStorage.getItem('token')}`, data);
  }

  updateDentist(id: number, data: any) {
    return this.http.put(`${environment.endpoint}/dentist/${id}?token=${localStorage.getItem('token')}`, data);
  }

  deleteDentist(id: number) {
    return this.http.delete(`${environment.endpoint}/dentist/${id}?token=${localStorage.getItem('token')}`);
  }

  getDentistsbyConsultory(consultory_id: number) {
    return this.http.get(`${environment.endpoint}/dentists_consultory/${consultory_id}?token=${localStorage.getItem('token')}`);
  }
}
