import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlModule } from 'form-control';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

@NgModule({
    declarations: [
    DynamicFormComponent
  ],
    imports: [
        CommonModule,
        FormControlModule
    ]
})
export class FormModule { }
