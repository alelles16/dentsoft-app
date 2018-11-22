import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomePage } from './home.page';
import { PatientsPage } from './patients/patients.page';
import { DentistsPage } from './dentists/dentists.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'patients',
        component: PatientsPage
      },
      {
        path: 'dentists',
        component: DentistsPage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [HomePage, PatientsPage, DentistsPage]
})
export class HomePageModule { }
