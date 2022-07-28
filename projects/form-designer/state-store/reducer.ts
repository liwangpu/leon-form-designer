import { createReducer } from '@ngrx/store';
import { FORM_DESIGNER_INITIAL_STATE } from './state';

const _reducer = createReducer(FORM_DESIGNER_INITIAL_STATE,
  // on()
)

export function formDesignerReducer() {
  return _reducer;
}
