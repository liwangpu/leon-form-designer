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

export const selectActiveComponentId: MemoizedSelector<FormDesignerState, string> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => state.activeComponentId
);

export const selectAllComponentIds: MemoizedSelector<FormDesignerState, string[]> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => state.componentTree?.length ? state.componentTree.map(c => c.id) : []
);