import { Component, OnInit, TemplateRef } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import { DentistService } from '../../services/dentist/dentist.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../services/reports/reports.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  public medicalHistoryForm: FormGroup;
  public patients: any = [];
  public dentists: any = [];
  public patient = null;
  public dentist = null;
  public report = null;
  public rows = [];
  public editing = true;
  modalRef: BsModalRef;

  constructor(
    private patientsService: PatientService,
    private dentistService: DentistService,
    public fb: FormBuilder,
    public reportService : ReportsService,
    private modalService: BsModalService,
  ) {
    this.getData();
  }

  ngOnInit() {
    this.getData();
    this.newMedicalHistory(null);
  }

  getData() {
    const consultory = JSON.parse(localStorage.getItem('consultory'));

    this.patientsService.getPatientsbyConsultory(consultory.id)
      .subscribe((data: any) => {
        this.patients = data;
      });

    this.dentistService.getDentistsbyConsultory(consultory.id)
      .subscribe((data: any) => {
        this.dentists = data;
      });
  }

  onChangePatientSelect(event) {
    const value = event.target.value;
    this.reportService.getReportsbyPatient(value)
    .subscribe((data: any) => {
      this.rows = data;
    });
  }

  changeValue(value: boolean) {
    this.editing = value;
    this.newMedicalHistory(null);
    this.patient = null;
    this.dentist = null;
  }

  openModalDetailReport(template: TemplateRef<any>, row: any) {
    this.report = row;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.newMedicalHistory(row);
  }

  newMedicalHistory(data: any) {
    let question, intraOral = null;
    if (data) {
      question = JSON.parse(data.questions);
      intraOral = JSON.parse(data.intraOral);
    }

    this.medicalHistoryForm = this.fb.group({
      patient: ['', Validators.required],
      dentist: ['', Validators.required],
      name: [{ value: data ? data.patient.name : '', disabled: this.editing }, Validators.required],
      lastname: [{ value: data ? data.patient.lastname : '', disabled: this.editing }, Validators.required],
      age: [{ value: data ? data.patient.age : '', disabled: this.editing }, Validators.required],
      gender: [{ value: data ? data.patient.gender : '', disabled: this.editing }, Validators.required],
      identification: [{ value: data ? data.patient.identificacion : '', disabled: this.editing }, Validators.required],
      placeofbirth: [{ value: data ? data.patient.placeofbirth : '', disabled: this.editing }, Validators.required],
      birthdate: [{ value: data ? data.patient.birthdate : '', disabled: this.editing }, Validators.required],
      mobile: [{ value: data ? data.patient.mobile : '', disabled: this.editing }, Validators.required],
      dentistName: [{ value: data ? data.dentist.name : '', disabled: this.editing }, Validators.required],
      questions: this.fb.group({
        reason: [{ value: data ? question.reason : '', disabled: this.editing }, Validators.required],
        actualIll: [{ value: data ? question.actualIll : '', disabled: this.editing }, Validators.required],
        medicalTreatment: [{ value: data ? question.medicalTreatment : false, disabled: this.editing }, Validators.required],
        medication: [{ value: data ? question.medication : false, disabled: this.editing }, Validators.required],
        surgicalIntervention: [{ value: data ? question.surgicalIntervention : false, disabled: this.editing }, Validators.required],
        bloodTransfusion: [{ value: data ? question.bloodTransfusion : false, disabled: this.editing }, Validators.required],
        usedDrugs: [{ value: data ? question.usedDrugs : false, disabled: this.editing }, Validators.required],
        allergicReaction: [{ value: data ? question.allergicReaction : false, disabled: this.editing }, Validators.required],
        anesthesia: [{ value: data ? question.anesthesia : false, disabled: this.editing }, Validators.required],
        aspirin: [{ value: data ? question.aspirin : false, disabled: this.editing }, Validators.required],
        penicillin: [{ value: data ? question.penicillin : false, disabled: this.editing }, Validators.required],
        bloodPressure: [{ value: data ? question.bloodPressure : false, disabled: this.editing }, Validators.required],
        highPressure: [{ value: data ? question.highPressure : false, disabled: this.editing }, Validators.required],
        lowPressure: [{ value: data ? question.lowPressure : false, disabled: this.editing }, Validators.required],
        bloodCut: [{ value: data ? question.bloodCut : false, disabled: this.editing }, Validators.required],
        bloodProblem: [{ value: data ? question.bloodProblem : false, disabled: this.editing }, Validators.required],
        bloodsIllness: [{ value: data ? question.bloodsIllness : false, disabled: this.editing }, Validators.required],
        vih: [{ value: data ? question.vih : false, disabled: this.editing }, Validators.required],
        retrovitalMedication: [{ value: data ? question.retrovitalMedication : false, disabled: this.editing }, Validators.required],
        controlPills: [{ value: data ? question.controlPills : false, disabled: this.editing }, Validators.required],
        pregnant: [{ value: data ? question.pregnant : false, disabled: this.editing }, Validators.required],
        suffered: [{ value: data ? question.suffered : false, disabled: this.editing }, Validators.required],
        veneralDiseases: [{ value: data ? question.veneralDiseases : false, disabled: this.editing }, Validators.required],
        heartProblems: [{ value: data ? question.heartProblems : false, disabled: this.editing }, Validators.required],
        hepatitis: [{ value: data ? question.hepatitis : false, disabled: this.editing }, Validators.required],
        face: [{ value: data ? question.face : '', disabled: this.editing }, Validators.required],
        lipsCorner: [{ value: data ? question.lipsCorner : '', disabled: this.editing }, Validators.required],
        ganglia: [{ value: data ? question.ganglia : '', disabled: this.editing }, Validators.required],
        atm: [{ value: data ? question.atm : '', disabled: this.editing }, Validators.required],
        ears: [{ value: data ? question.ears : '', disabled: this.editing }, Validators.required],
      }),
      intraOral: this.fb.group({
        cheeks: [{ value: data ? intraOral.cheeks : '', disabled: this.editing }, Validators.required],
        mucous: [{ value: data ? intraOral.mucous : '', disabled: this.editing }, Validators.required],
        gum: [{ value: data ? intraOral.gum : '', disabled: this.editing }, Validators.required],
        tongue: [{ value: data ? intraOral.tongue : '', disabled: this.editing }, Validators.required],
        palate: [{ value: data ? intraOral.palate : '', disabled: this.editing }, Validators.required],
      }),
    });
  }

  OnSubmitHistory() {
    this.reportService.saveReport(this.medicalHistoryForm.value)
    .subscribe(data => {
    });
  }

  onChangePatient(event) {
    const value = event.target.value;
    this.patients.forEach(element => {
      if (element.id == value) {
        this.patient = element;
        this.medicalHistoryForm.controls.name.setValue(this.patient.name);
        this.medicalHistoryForm.controls.lastname.setValue(this.patient.lastname);
        this.medicalHistoryForm.controls.age.setValue(this.patient.age);
        this.medicalHistoryForm.controls.gender.setValue(this.patient.gender);
        this.medicalHistoryForm.controls.identification.setValue(this.patient.identification);
        this.medicalHistoryForm.controls.placeofbirth.setValue(this.patient.placeofbirth);
        this.medicalHistoryForm.controls.birthdate.setValue(this.patient.birthdate);
        this.medicalHistoryForm.controls.mobile.setValue(this.patient.mobile);
      }
    });
  }

  onChangeDentist(event) {
    const value = event.target.value;
    this.dentists.forEach(element => {
      if (element.id == value) {
        this.dentist = element;
        this.medicalHistoryForm.controls.dentistName.setValue(this.dentist.name);
      }
    });
  }

}
