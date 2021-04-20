import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { VariousTableMenuComponent } from './various-table-menu/various-table-menu.component';
import { Route, RouterModule } from '@angular/router';
import { TableConfigComponent } from './table-config/table-config.component';
import { TableUIModule } from '../mat-table-ui/tableUi.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../mat-table-ui/material.module';

const baseTableRoute: Route[] = [
  {
    path: '',
    redirectTo: 'simple-table',
    pathMatch: 'full'
  },
  {
    path: 'config',
    component: TableConfigComponent
  },
  {
    path: 'simple-table',
    component: SimpleTableComponent
  }
];

@NgModule({
  declarations: [
    SimpleTableComponent,
    TableConfigComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(baseTableRoute),
    TableUIModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TableExperimentModule { }
