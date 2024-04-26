import {create} from 'zustand';

export const useTreeViewStore = create(set => ({
  checked: new Set(),
  updateChecked: checked => set({checked}),

  indeterminate: new Set(),
  updateIndeterminate: indeterminate => set({indeterminate}),

  expanded: new Set(),
  updateExpanded: expanded => set({expanded}),

  initialTreeViewData: [],
  updateInitialTreeViewData: initialTreeViewData => set({initialTreeViewData}),

  nodeMap: new Map(),
  updateNodeMap: nodeMap => set({nodeMap}),

  childToParentMap: new Map(),
  updateChildToParentMap: childToParentMap => set({childToParentMap}),
}));
