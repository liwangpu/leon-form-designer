import { createAction, props } from '@ngrx/store';

export const addNewComponent = createAction('[form-designer] 添加新组件', props<{ id: string, componentType: string, parentId: string,index:number, source: string }>());
export const activeComponent = createAction('[form-designer] 激活组件', props<{ id: string, source: string }>());