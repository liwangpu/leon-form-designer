import { createSelector, MemoizedSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'form-core';
import { FormDesignerState, selectFormDesignerState } from '../state';

export const selectActiveComponentConfiguration: MemoizedSelector<FormDesignerState, DynamicComponentMetadata> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!state.activeComponentId) { return null; }

    const tree = state.componentTree.find(c => c.id === state.activeComponentId);
    if (!tree) { return null; }
    const configuration = state.componentConfiguration[tree.id] || {};
    return { ...configuration, id: tree.id, type: tree.type };
  }
);

export const selectComponentConfiguration: (id: string) => MemoizedSelector<FormDesignerState, DynamicComponentMetadata> = id => createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!id) { return null; }

    const tree = state.componentTree.find(c => c.id === id);
    if (!tree) { return null; }
    const configuration = state.componentConfiguration[tree.id] || {};
    return { ...configuration, id: tree.id, type: tree.type };
  }
);