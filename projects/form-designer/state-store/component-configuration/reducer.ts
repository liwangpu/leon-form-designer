import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentConfiguration, (state: FormDesignerState, { id, configuration }) => {
    const componentConfiguration = { ...state.componentConfiguration };
    componentConfiguration[id] = configuration as any;
    return { ...state, componentConfiguration };
  })
];