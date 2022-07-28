import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { formDataCenterStateKey } from './data-center-state';
import { dataCenterReducer } from './data-center-reducer';


@NgModule({
    imports: [
        StoreModule.forFeature(formDataCenterStateKey, dataCenterReducer)
    ]
})
export class FormDataCenterModule { }
