import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient) { }

  newPatient(data: any) {
    return this.http.post(`${environment.endpoint}/patient?token=${localStorage.getItem('token')}`, data);
  }

  updatePatient(id: number, data: any) {
    return this.http.put(`${environment.endpoint}/patient/${id}?token=${localStorage.getItem('token')}`, data);
  }

  deletePatient(id: number) {
    return this.http.delete(`${environment.endpoint}/patient/${id}?token=${localStorage.getItem('token')}`);
  }

  getPatientsbyConsultory(consultory_id: number) {
    return this.http.get(`${environment.endpoint}/patients_consultory/${consultory_id}?token=${localStorage.getItem('token')}`);
  }
}
