import { Action, createReducer } from '@ngrx/store';
import { FormDataCenterState, DATA_CENTER_INITIAL_STATE } from '../data-center-state';
import { ons } from './reducer';
import * as fromAction from './action';

const formDataReducer = createReducer<FormDataCenterState, Action>(DATA_CENTER_INITIAL_STATE, ...ons);

fdescribe('Form Data Center Reducer', () => {

    it('setFormData', () => {
        const action = fromAction.setFormData({ formKey: 'aaa', data: { name: 'Leon', age: 18 } });
        const state = formDataReducer(DATA_CENTER_INITIAL_STATE, action);
        console.log('state:', state);
    });
});