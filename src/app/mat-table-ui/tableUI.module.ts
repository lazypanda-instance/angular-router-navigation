import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CustomTableComponent } from './custom-table/custom-table.component';

@NgModule({
  declarations: [
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CustomTableComponent
  ]
})
export class TableUIModule { }
