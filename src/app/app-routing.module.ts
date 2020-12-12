import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mat-table',
    pathMatch: 'full'
  },
  {
    path: 'mat-table',
    loadChildren: () => import('./table-experiment/table-experiment.module').then(m => m.TableExperimentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
