import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path : 'admin', component : AdminComponent}
];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
