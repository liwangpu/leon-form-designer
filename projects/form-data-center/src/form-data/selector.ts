import { state } from '@angular/animations';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormDataCenterState, formDataCenterStateKey, selectFormDataCenter } from '../store';
import { IFormDataState } from './state';

export const selectFormData = (formKey: string) => createSelector(
    selectFormDataCenter,
    (state: FormDataCenterState) => {
        return state.data[formKey];
    }
);