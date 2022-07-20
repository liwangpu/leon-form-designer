import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormDemoRoutingModule } from './dynamic-form-demo-routing.module';
import { FormModule as DynamicFormModule } from 'dynamic-form';
import { FormDetailComponent } from './components/form-detail/form-detail.component';
import { FormDataCenterModule } from 'form-data-center';

@NgModule({
    declarations: [
        FormDetailComponent
    ],
    imports: [
        CommonModule,
        DynamicFormDemoRoutingModule,
        DynamicFormModule,
        FormDataCenterModule
    ]
})
export class DynamicFormDemoModule { }
