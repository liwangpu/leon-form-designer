import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: FormDesignerState, { id, metadata }) => {
    const componentTree = [...state.componentTree];
    const componentMetadata = { ...state.componentMetadata };
    componentMetadata[id] = metadata;
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        if (!componentTree.some(c => c.id === cmd.id)) {
          const ctree: ComponentTreeState = { id: cmd.id, type: cmd.type, parentId: id };
          componentTree.push(ctree);
        }
      }
    }
    return { ...state, componentMetadata, componentTree };
  })
];