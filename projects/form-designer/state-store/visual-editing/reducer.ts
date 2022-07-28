import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: FormDesignerState, { id, componentType, parentId }) => {
    // const form: IFormDataState = getFormData(state, formKey);ste
    const tree = [...state.componentTree];
    const comp: ComponentTreeState = { id, type: componentType, parentId };
    tree.push(comp);
    return { ...state, componentTree: tree };
  })
];