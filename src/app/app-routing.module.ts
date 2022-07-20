import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'dynamic-form-demo',
        loadChildren: () => import('./dynamic-form-demo/dynamic-form-demo.module').then(m => m.DynamicFormDemoModule)
    },
    { path: '', pathMatch: 'full', redirectTo: 'dynamic-form-demo' },
    { path: '**', redirectTo: 'dynamic-form-demo' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
