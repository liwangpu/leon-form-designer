import { createAction, props } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';

export const addNewComponent = createAction('[form-designer] 添加新组件', props<{ metadata: DynamicComponentMetadata, parentId: string, index: number, source: string }>());
export const activeComponent = createAction('[form-designer] 激活组件', props<{ id: string, source: string }>());
export const moveComponent = createAction('[form-designer] 移动组件', props<{ id: string, parentId: string, index: number, source: string }>());
