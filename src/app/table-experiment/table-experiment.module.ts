import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { VariousTableMenuComponent } from './various-table-menu/various-table-menu.component';
import { Route, RouterModule } from '@angular/router';
import { TableConfigComponent } from './table-config/table-config.component';
import { TableUIModule } from '../mat-table-ui/tableUi.module';

const baseTableRoute: Route[] = [
  {
    path: '',
    redirectTo: 'simple-table?type=simple-table',
    pathMatch: 'full'
  },
  {
    path: '',
    component: VariousTableMenuComponent,
    children: [
      {
        path: 'config',
        component: TableConfigComponent
      },
      {
        path: 'simple-table',
        component: SimpleTableComponent
      },
      {
        path: 'table-with-select-all',
        component: SimpleTableComponent
      },
      {
        path: 'table-with-multiple-page',
        component: SimpleTableComponent
      },
      {
        path: 'table-with-highlight',
        component: SimpleTableComponent
      },
      {
        path: 'table-with-custom-control',
        component: SimpleTableComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SimpleTableComponent,
    VariousTableMenuComponent,
    TableConfigComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(baseTableRoute),
    TableUIModule
  ]
})
export class TableExperimentModule { }
