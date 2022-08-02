import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: FormDesignerState, { id, componentType, parentId, index }) => {
    const tree = [...state.componentTree];
    const comp: ComponentTreeState = { id, type: componentType, parentId };
    tree.splice(index, 0, comp);
    return { ...state, componentTree: tree, activeComponentId: id };
  }),
  on(fromAction.activeComponent, (state: FormDesignerState, { id }) => {
    return { ...state, activeComponentId: id };
  })
];