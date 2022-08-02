import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ComponentDesignConfiguration } from 'form-core';
import { FormDesignerState, selectFormDesignerState } from '../state';

export const selectActiveComponentConfiguration: MemoizedSelector<FormDesignerState, ComponentDesignConfiguration> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!state.activeComponentId) { return null; }

    const comp = state.componentTree.find(c => c.id === state.activeComponentId);
    if (!comp) { return null; }
    const cfg: ComponentDesignConfiguration = { id: comp.id, type: comp.type, config: state.componentConfiguration[comp.id] };
    return cfg;
  }
);
