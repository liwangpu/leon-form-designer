import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerComponent } from './components/designer/designer.component';

const routes: Routes = [
  {
    path: 'designer',
    component: DesignerComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'designer' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
