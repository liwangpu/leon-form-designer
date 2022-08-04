import { createFeatureSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { ComponentTreeState } from './visual-editing/state';

export interface FormDesignerState {
  activeComponentId?: string;
  componentMetadata: { [id: string]: DynamicComponentMetadata };
  componentTree: ComponentTreeState[];
}

export const FORM_DESIGNER_INITIAL_STATE: FormDesignerState = {
  componentMetadata: {},
  componentTree: []
}

export const formDesignerStateKey: string = 'formDesigner';

export const selectFormDesignerState = createFeatureSelector<FormDesignerState>(formDesignerStateKey);