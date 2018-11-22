import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  constructor(public http: HttpClient) { }

  newDentist(data: any) {
    return this.http.post(`${environment.endpoint}/dentist`, data);
  }

  updateDentist(id: number, data: any) {
    return this.http.put(`${environment.endpoint}/dentist/${id}`, data);
  }

  deleteDentist(id: number) {
    return this.http.delete(`${environment.endpoint}/dentist/${id}`);
  }

  getDentistsbyConsultory(consultory_id: number) {
    return this.http.get(`${environment.endpoint}/dentists_consultory/${consultory_id}`);
  }
}
