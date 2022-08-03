import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { FormDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: FormDesignerState, { metadata, parentId, index }) => {
    const componentTree = [...state.componentTree];
    const componentConfiguration = { ...state.componentConfiguration };
    const comp: ComponentTreeState = { id: metadata.id, type: metadata.type, parentId };
    componentTree.splice(index, 0, comp);
    // const md: DynamicComponentMetadata = { id: metadata.id, type: metadata.type, title: metadata.title };
    componentConfiguration[metadata.id] = metadata;
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        if (!componentTree.some(c => c.id === cmd.id)) {
          const ctree: ComponentTreeState = { id: cmd.id, type: cmd.type, parentId: metadata.id };
          componentTree.push(ctree);
        }
      }
    }
    return { ...state, componentTree, componentConfiguration, activeComponentId: metadata.id };
  }),
  on(fromAction.activeComponent, (state: FormDesignerState, { id }) => {
    if (state.activeComponentId === id) { return state; }
    return { ...state, activeComponentId: id };
  })
];