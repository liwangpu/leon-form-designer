import { createAction, props } from '@ngrx/store';

export const setComponentConfiguration = createAction('[form-designer] 设置组件配置', props<{ id: string, configuration: { [key: string]: any }, source: string }>());