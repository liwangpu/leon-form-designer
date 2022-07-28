import { createReducer } from '@ngrx/store';
import { FORM_DESIGNER_INITIAL_STATE } from './state';
import { ons as visualEditingOns } from './visual-editing/reducer';

const _reducer = createReducer(FORM_DESIGNER_INITIAL_STATE, ...[
  ...visualEditingOns
])

export function formDesignerReducer(state: any, action: any): any {
  return _reducer(state, action);
}
