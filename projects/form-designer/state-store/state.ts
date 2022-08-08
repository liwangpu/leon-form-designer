import { createFeatureSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { ComponentTreeState } from './visual-editing/state';

export interface FormDesignerState {
  activeComponentId?: string;
  hoverComponentId?: string;
  componentMetadata: { [id: string]: DynamicComponentMetadata };
  componentTree: { [id: string]: ComponentTreeState };
}

export const FORM_DESIGNER_INITIAL_STATE: FormDesignerState = {
  componentMetadata: {},
  componentTree: {
    'page': { id: 'page', type: 'page' }
  }
}

export const formDesignerStateKey: string = 'formDesigner';

export const selectFormDesignerState = createFeatureSelector<FormDesignerState>(formDesignerStateKey);