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
  public detailPatientForm: FormGroup;
  public consultory = JSON.parse(localStorage.getItem('consultory'));
  public patient: any;
  public editing = false;
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
  }

  getData() {
    this.patientService.getPatientsbyConsultory(this.consultory.id)
      .subscribe((data: any) => {
        this.rows = data;
      }, error => {
      });
  }

  openModalCreatePatient(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.newPatientForm();
  }

  newPatientForm() {
    this.createPatientForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      age: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      gender: ['', Validators.required],
      identification: ['', Validators.required],
      placeofbirth: ['', Validators.required],
      birthdate: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      consultory_id: this.consultory.id,
    });
  }

  OnSubmitCreatePatient() {
    this.patientService.newPatient(this.createPatientForm.value)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
        this.createPatientForm.reset();
      }, error => {
      });
  }

  openModalDetailPatient(template: TemplateRef<any>, row: any, no_edit: boolean) {
    this.patient = row;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.showPatientForm(row, no_edit);
    this.editing = !no_edit;
  }

  showPatientForm(data: any, no_edit: boolean) {
    this.detailPatientForm = this.fb.group({
      name: [{ value: data ? data.name : '', disabled: no_edit }, Validators.required],
      lastname: [{ value: data ? data.lastname : '', disabled: no_edit }, Validators.required],
      age: [{ value: data ? data.age : '', disabled: no_edit }, Validators.required],
      gender: [{ value: data ? data.gender : '', disabled: no_edit }, Validators.required],
      identification: [{ value: data ? data.identification : '', disabled: true }, Validators.required],
      placeofbirth: [{ value: data ? data.placeofbirth : '', disabled: no_edit }, Validators.required],
      birthdate: [{ value: data ? data.birthdate : '', disabled: no_edit }, Validators.required],
      telephone: [{ value: data ? data.telephone : '', disabled: no_edit }, Validators.required],
      mobile: [{ value: data ? data.mobile : '', disabled: no_edit }, Validators.required],
      consultory_id: this.consultory.id,
    });
  }

  OnSubmitDetails() {
    this.patientService.updatePatient(this.patient.id, this.detailPatientForm.value)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
        this.detailPatientForm.reset();
      }, error => {
      });
  }

  openModalDeletePatient(template: TemplateRef<any>, row: any) {
    this.patient = row;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-danger modal-dialog-centered modal' });
  }

  confirmDeletePatient(): void {
    this.patientService.deletePatient(this.patient.id)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
      }, error => {
      });
  }

  declineDeletePatient(): void {
    this.modalRef.hide();
  }

}
