import { ActionType, combineReducers, createReducer, on } from '@ngrx/store';
import * as fromState from './state';
import * as fromAction from './action';

// export const formDataReducer = createReducer(fromState.INITIAL_FORM__DATA_STATE,
//     on(fromAction.setFormData, (state: fromState.IFormDataState, { formKey, data }) => {
//         // console.log('sss:', state);
//         return { ...state, [formKey]: data };
//     })
// );

on<fromState.IFormDataState,fromAction.setFormData>(fromAction.setFormData, (state: fromState.IFormDataState, { formKey, data }) => {
    // console.log('sss:', state);
    return { ...state, [formKey]: data };
})