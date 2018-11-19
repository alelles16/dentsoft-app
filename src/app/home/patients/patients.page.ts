import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  modalRef: BsModalRef;
  public createPatientForm: FormGroup;
  public consultory = JSON.parse(localStorage.getItem('consultory'));
  public patient: any;
  public result: any = {
    'type': '',
    'message': ''
  };

  public rows = [];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private patientService: PatientService,
  ) {
  }

  ngOnInit() {
    this.getData();
    this.newPatientForm();
  }

  getData() {
    this.patientService.getPatientsbyConsultory(this.consultory.id)
      .subscribe((data: any) => {
        console.log(data);
        this.rows = data;
      }, error => {
        console.log(error);
      });
  }

  openModalCreatePatient(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  newPatientForm() {
    this.createPatientForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      identification: ['', Validators.required],
      placeofbirth: ['', Validators.required],
      birthdate: ['', Validators.required],
      telephone: ['', Validators.required],
      mobile: ['', Validators.required],
      consultory_id: this.consultory.id,
    });
  }

  openModalShowPatient(template: TemplateRef<any>, row: any) {
    this.patient = row;
    this.modalRef = this.modalService.show(template);
    console.log(row);
  }

  OnSubmitCreatePatient() {
    console.log(this.createPatientForm.value);
    this.patientService.newPatient(this.createPatientForm.value)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
      }, error => {
        console.log(error);
      });
  }

}
