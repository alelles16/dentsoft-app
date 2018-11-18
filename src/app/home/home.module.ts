import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PatientsPage } from './patients/patients.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
        path: 'patients',
        component: PatientsPage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, PatientsPage]
})
export class HomePageModule { }
