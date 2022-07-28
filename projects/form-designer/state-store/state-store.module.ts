import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { formDesignerStateKey } from './state';
import { formDesignerReducer } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(formDesignerStateKey, formDesignerReducer)
  ]
})
export class StateStoreModule { }
