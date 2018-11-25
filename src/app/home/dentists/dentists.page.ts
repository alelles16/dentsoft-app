import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DentistService } from '../../services/dentist/dentist.service';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.page.html',
  styleUrls: ['./dentists.page.scss'],
})
export class DentistsPage implements OnInit {

  modalRef: BsModalRef;
  public createDentistForm: FormGroup;
  public detailDentistForm: FormGroup;
  public consultory = JSON.parse(localStorage.getItem('consultory'));
  public dentist: any;
  public editing = false;
  public result: any = {
    'type': '',
    'message': ''
  };

  public rows = [];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private dentistService: DentistService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dentistService.getDentistsbyConsultory(this.consultory.id)
    .subscribe((data: any) => {
      this.rows = data;
    }, error => {
    });
  }

  openModalCreateDentist(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.newDentistForm();
  }

  newDentistForm() {
    this.createDentistForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      consultory_id: this.consultory.id,
    });
  }

  OnSubmitCreateDentist() {
    this.dentistService.newDentist(this.createDentistForm.value)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
        this.createDentistForm.reset();
      }, error => {
      });
  }

  openModalDetailDentist(template: TemplateRef<any>, row: any, no_edit: boolean) {
    this.dentist = row;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.showDentistForm(row, no_edit);
    this.editing = !no_edit;
  }

  showDentistForm(data: any, no_edit: boolean) {
    this.detailDentistForm = this.fb.group({
      name: [{ value: data ? data.name : '', disabled: no_edit }, Validators.required],
      lastname: [{ value: data ? data.lastname : '', disabled: no_edit }, Validators.required],
      mobile: [{ value: data ? data.mobile : '', disabled: no_edit }, Validators.required],
      consultory_id: this.consultory.id,
    });
  }

  OnSubmitDetails() {
    this.dentistService.updateDentist(this.dentist.id, this.detailDentistForm.value)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
        this.detailDentistForm.reset();
      }, error => {
      });
  }

  openModalDeleteDentist(template: TemplateRef<any>, row: any) {
    this.dentist = row;
    this.modalRef = this.modalService.show(template, { class: 'modal-md modal-danger modal-dialog-centered modal' });
  }

  confirmDeleteDentist(): void {
    this.dentistService.deleteDentist(this.dentist.id)
      .subscribe((data: any) => {
        this.getData();
        this.modalRef.hide();
      }, error => {
      });
  }

  declineDeleteDentist(): void {
    this.modalRef.hide();
  }

}
