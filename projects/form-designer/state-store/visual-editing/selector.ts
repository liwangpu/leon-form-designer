import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { FormDesignerState, selectFormDesignerState } from '../state';

export const selectChildComponents: (id: string) => MemoizedSelector<FormDesignerState, { id: string; title?: string; type: string }[]> = id => createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!id) { return []; }
    const children = state.componentTree.filter(c => c.parentId === id);
    return children;
  }
);