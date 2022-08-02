import { createFeatureSelector } from '@ngrx/store';
import { ComponentConfigurationState } from './component-configuration/state';
import { ComponentTreeState } from './visual-editing/state';

export interface FormDesignerState {
  activeComponentId?: string;
  componentConfiguration: { [id: string]: ComponentConfigurationState };
  componentTree: ComponentTreeState[];
}

export const FORM_DESIGNER_INITIAL_STATE: FormDesignerState = {
  componentConfiguration: {},
  componentTree: []
}

export const formDesignerStateKey: string = 'formDesigner';

export const selectFormDesignerState = createFeatureSelector<FormDesignerState>(formDesignerStateKey);