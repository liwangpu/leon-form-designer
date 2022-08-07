import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { FormDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: FormDesignerState, { metadata, parentId, index }) => {
    const componentTree = { ...state.componentTree };
    if (componentTree[metadata.id]) { return state; }
    const componentMetadata = { ...state.componentMetadata };
    const tree: ComponentTreeState = { id: metadata.id, type: metadata.type, parentId };
    // 
    componentTree[metadata.id] = tree;
    const parentTree = { ...componentTree[parentId] };
    parentTree.body = parentTree.body?.length ? [...parentTree.body] : [];
    parentTree.body.push(metadata.id);
    componentTree[parentId] = parentTree;
    // console.log('parent tree:', parentTree);
    // console.log('componentTree:', componentTree);
    componentMetadata[metadata.id] = { ...metadata, body: [] };
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        if (!componentTree[cmd.id]) {
          const ctree: ComponentTreeState = { id: cmd.id, type: cmd.type, parentId: metadata.id };
          componentTree[ctree.id] = ctree;
          componentMetadata[cmd.id] = cmd;
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
    const componentTree = { ...state.componentTree };
    const tree = state.componentTree[id];
    const originParent = { ...state.componentTree[tree.parentId] };
    originParent.body = originParent.body?.length ? [...originParent.body] : [];
    const oldIndex = originParent.body.findIndex(oid => oid === id);
    originParent.body.splice(oldIndex, 1);
    componentTree[tree.parentId] = originParent;
    const parentTree = { ...componentTree[parentId] };
    parentTree.body = parentTree.body?.length ? [...parentTree.body] : [];
    parentTree.body.splice(index, 0, id);
    componentTree[parentTree.id] = parentTree;
    return { ...state, componentTree };
  })
];