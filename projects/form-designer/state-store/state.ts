import { createFeatureSelector } from '@ngrx/store';
import { ComponentSettingState } from './component-setting/state';
import { ComponentTreeState } from './visual-editing/state';

export interface FormDesignerState {
  componentSetting: { [id: string]: ComponentSettingState };
  componentTree: ComponentTreeState[];
}

export const FORM_DESIGNER_INITIAL_STATE: FormDesignerState = {
  componentSetting: {},
  componentTree: []
}

export const formDesignerStateKey: string = 'formDesigner';

export const selectFormDataCenter = createFeatureSelector<FormDesignerState>(formDesignerStateKey);