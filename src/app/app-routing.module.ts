import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dynamic-form-demo',
    loadChildren: () => import('./dynamic-form-demo/dynamic-form-demo.module').then(m => m.DynamicFormDemoModule)
  },
  {
    path: 'form-designer',
    loadChildren: () => import('./module-loaders/designer-loader/designer-loader.module').then(m => m.DesignerLoaderModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'form-designer' },
  { path: '**', redirectTo: 'form-designer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
