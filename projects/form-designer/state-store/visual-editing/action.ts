import { createAction, props } from '@ngrx/store';

export const addNewComponent = createAction('[form-designer] 添加新组件', props<{ id: string, componentType: string, parentId: string, source: string }>());