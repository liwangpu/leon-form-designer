import { createReducer } from '@ngrx/store';
import { DATA_CENTER_INITIAL_STATE } from './data-center-state';
import { ons as formDataOns } from './form-data/reducer';

export const dataCenterReducer = createReducer(DATA_CENTER_INITIAL_STATE, ...[
    ...formDataOns
]);
