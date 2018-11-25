import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import { DentistService } from '../../services/dentist/dentist.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../services/reports/reports.service';

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

  constructor(
    private patientsService: PatientService,
    private dentistService: DentistService,
    public fb: FormBuilder,
    public reportService : ReportsService 
  ) {
    this.getData();
  }

  ngOnInit() {
    this.getData();
    this.newMedicalHistory();
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

  newMedicalHistory() {
    this.medicalHistoryForm = this.fb.group({
      patient: ['', Validators.required],
      dentist: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      identification: ['', Validators.required],
      placeofbirth: ['', Validators.required],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.required],
      dentistName: ['', Validators.required],
      questions: this.fb.group({
        reason: ['', Validators.required],
        actualIll: ['', Validators.required],
        medicalTreatment: [false, Validators.required],
        medication: [false, Validators.required],
        surgicalIntervention: [false, Validators.required],
        bloodTransfusion: [false, Validators.required],
        usedDrugs: [false, Validators.required],
        allergicReaction: [false, Validators.required],
        anesthesia: [false, Validators.required],
        aspirin: [false, Validators.required],
        penicillin: [false, Validators.required],
        bloodPressure: [false, Validators.required],
        highPressure: [false, Validators.required],
        lowPressure: [false, Validators.required],
        bloodCut: [false, Validators.required],
        bloodProblem: [false, Validators.required],
        bloodsIllness: [false, Validators.required],
        vih: [false, Validators.required],
        retrovitalMedication: [false, Validators.required],
        controlPills: [false, Validators.required],
        pregnant: [false, Validators.required],
        suffered: [false, Validators.required],
        veneralDiseases: [false, Validators.required],
        heartProblems: [false, Validators.required],
        hepatitis: [false, Validators.required],
        face: ['', Validators.required],
        lipsCorner: ['', Validators.required],
        ganglia: ['', Validators.required],
        atm: ['', Validators.required],
        ears: ['', Validators.required],
      }),
      intraOral: this.fb.group({
        cheeks: ['', Validators.required],
        mucous: ['', Validators.required],
        gum: ['', Validators.required],
        tongue: ['', Validators.required],
        palate: ['', Validators.required],
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
