import { createAction, props } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';

export const setComponentMetadata = createAction('[form-designer] 设置组件配置', props<{ id: string, metadata: DynamicComponentMetadata, source: string }>());