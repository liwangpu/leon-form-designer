import { NgModule } from '@angular/core';
import { combineReducers, StoreModule } from '@ngrx/store';
import { } from './form-data';
import { formDataReducer } from './form-data/reducer';
import { formDataCenterStateKey } from './store';
// import * as fromState from './states';


const stateReducer = combineReducers({
    data: formDataReducer
})

@NgModule({
    imports: [
        StoreModule.forFeature(formDataCenterStateKey, stateReducer)
    ]
})
export class FormDataCenterModule { }
