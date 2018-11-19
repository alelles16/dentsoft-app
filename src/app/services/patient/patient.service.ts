import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient) { }

  newPatient(data: any) {
    return this.http.post(`${environment.endpoint}/patient`, data);
  }

  getPatientsbyConsultory(consultory_id: number) {
    return this.http.get(`${environment.endpoint}/patients_consultory/${consultory_id}`);
  }
}
