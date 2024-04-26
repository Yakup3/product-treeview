import {useTreeViewStore} from '../store/treeView.store';

export function handleToggleExpand(id) {
  const {initialTreeViewData, expanded, updateExpanded} =
    useTreeViewStore.getState();

  const newExpanded = new Set(expanded);

  function deleteChildrenFromExpanded(node) {
    if (node.children) {
      for (let child of node.children) {
        newExpanded.delete(child.id);
        deleteChildrenFromExpanded(child);
      }
    }
  }

  function findNode(nodes) {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        const found = findNode(node.children);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  const node = findNode(initialTreeViewData);

  if (expanded.has(id)) {
    newExpanded.delete(id);

    if (node) {
      deleteChildrenFromExpanded(node);
    }
  } else {
    newExpanded.add(id);
  }

  updateExpanded(newExpanded);
}
