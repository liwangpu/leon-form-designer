import { ActionCreator, ActionType, combineReducers, createReducer, Creator, on, ReducerTypes } from '@ngrx/store';
import * as fromAction from './action';
import { FormDataCenterState } from '../data-center-state';
import { IFormDataState } from './state';

function getFormData(state: FormDataCenterState, formKey: string): IFormDataState {
    if (!formKey) { return {}; }
    return state.data[formKey] ? { ...state.data[formKey] } : {};
}
export const ons: ReducerTypes<FormDataCenterState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
    on(fromAction.setFormData, (state: FormDataCenterState, { formKey, data }) => {
        // const form: IFormDataState = getFormData(state, formKey);
        return { ...state, data: { [formKey]: data } };
    })
];