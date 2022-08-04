import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { FormDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: FormDesignerState, { metadata, parentId, index }) => {
    const componentTree = [...state.componentTree];
    if (componentTree.some(c => c.id === metadata.id)) { return state; }
    const componentMetadata = { ...state.componentMetadata };
    const tree: ComponentTreeState = { id: metadata.id, type: metadata.type, parentId };
    componentTree.splice(index, 0, tree);
    componentMetadata[metadata.id] = { ...metadata, body: [] };
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        if (!componentTree.some(c => c.id === cmd.id)) {
          const ctree: ComponentTreeState = { id: cmd.id, type: cmd.type, parentId: metadata.id };
          componentTree.push(ctree);

          
        }
      }
      tree.body = metadata.body.map(c => c.id);
    }
    return { ...state, componentTree, componentMetadata, activeComponentId: metadata.id };
  }),
  on(fromAction.activeComponent, (state: FormDesignerState, { id }) => {
    if (state.activeComponentId === id) { return state; }
    return { ...state, activeComponentId: id };
  }),
  on(fromAction.moveComponent, (state: FormDesignerState, { id, parentId, index }) => {
    // if (state.activeComponentId === id) { return state; }
    const componentTree = [...state.componentTree];

    return { ...state };
  })
];