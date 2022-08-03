import { createAction, props } from '@ngrx/store';
import { FormDesignerState } from '../state';

export const setDesignerState = createAction('[form-designer] 设置设计器数据', props<{ state:FormDesignerState, source: string }>());