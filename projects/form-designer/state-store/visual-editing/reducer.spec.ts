import { Action, createReducer } from '@ngrx/store';
import { FormDesignerState, FORM_DESIGNER_INITIAL_STATE } from '../state';
import { ons } from './reducer';
import * as fromAction from './action';

const formDesignerReducer = createReducer<FormDesignerState, Action>(FORM_DESIGNER_INITIAL_STATE, ...ons);

describe('Visual Editing Reducer', () => {

  describe('Visual Editing Reducer', () => {
    it('moveComponent', () => {
      const state: FormDesignerState = {
        componentMetadata: {},
        componentTree: {
          page: { id: 'page', type: 'page', body: ['tabs1'] },
          tabs1: { id: 'tabs1', type: 'tabs', parentId: 'page', body: ['tab1'] },
          tabs1_body_tab_1: { id: 'tabs1_body_tab_1', type: 'tab', parentId: 'tabs1' },
          tabs2: { id: 'tabs2', type: 'tabs', parentId: 'tabs1_body_tab_1', body: ['tabs2_body_tab_1'] },
          tabs2_body_tab_1: { id: 'tabs2_body_tab_1', type: 'tab', parentId: 'tabs2' },
        }
      };
      const action = fromAction.moveComponent({ id: 'tabs2', parentId: 'page', index: 1, source: '' });
      const newState = formDesignerReducer(state, action);
      console.log('newState:', newState);
      const pageTree = newState.componentTree['page'];
      expect(pageTree.body).toEqual(['tabs1', 'tabs2']);
      const tabs1_body_tab_1_Tree = newState.componentTree['tabs1_body_tab_1'];
      expect(tabs1_body_tab_1_Tree.body).toEqual([]);
    });
  });
});