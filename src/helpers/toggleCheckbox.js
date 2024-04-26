import {useTreeViewStore} from '../store/treeView.store';

function toggleCheckboxes(ids, forceCheck) {
  const {
    checked,
    updateChecked,
    indeterminate,
    updateIndeterminate,
    nodeMap,
    childToParentMap,
  } = useTreeViewStore.getState();

  const tempChecked = new Set(checked);
  const tempIndeterminate = new Set(indeterminate);

  const memoAllDescendantsChecked = new Map();
  const memoAnyDescendantsChecked = new Map();

  const toggleNodeAndChildren = (nodeId, isChecked) => {
    if (isChecked) {
      tempChecked.add(nodeId);
      tempIndeterminate.delete(nodeId);
    } else {
      tempChecked.delete(nodeId);
    }

    const node = nodeMap.get(nodeId);
    if (node && node.children) {
      node.children.forEach(childNode => {
        if (isChecked) tempIndeterminate.delete(childNode.id);
        toggleNodeAndChildren(childNode.id, isChecked);
      });
    }
  };

  const areAllDescendantsChecked = nodeId => {
    if (memoAllDescendantsChecked.has(nodeId)) {
      return memoAllDescendantsChecked.get(nodeId);
    }

    const node = nodeMap.get(nodeId);
    let allChecked = true;

    if (node && node.children) {
      for (const childNode of node.children) {
        allChecked = allChecked && areAllDescendantsChecked(childNode.id);
      }
    } else {
      allChecked = tempChecked.has(nodeId);
    }

    memoAllDescendantsChecked.set(nodeId, allChecked);
    return allChecked;
  };

  const areAnyDescendantsChecked = nodeId => {
    if (memoAnyDescendantsChecked.has(nodeId)) {
      return memoAnyDescendantsChecked.get(nodeId);
    }

    const node = nodeMap.get(nodeId);
    let anyChecked = false;

    if (node && node.children) {
      for (const childNode of node.children) {
        anyChecked = anyChecked || areAnyDescendantsChecked(childNode.id);
      }
    } else {
      anyChecked = tempChecked.has(nodeId);
    }

    memoAnyDescendantsChecked.set(nodeId, anyChecked);
    return anyChecked;
  };

  const updateNodeAndAncestorsState = nodeId => {
    const node = nodeMap.get(nodeId);

    if (areAllDescendantsChecked(nodeId)) {
      tempChecked.add(nodeId);
      tempIndeterminate.delete(nodeId);
    } else if (areAnyDescendantsChecked(nodeId)) {
      if (
        node &&
        node.children &&
        node.children.every(childNode => areAllDescendantsChecked(childNode.id))
      ) {
        tempChecked.delete(nodeId);
        tempIndeterminate.delete(nodeId);
      } else {
        tempChecked.delete(nodeId);
        tempIndeterminate.add(nodeId);
      }
    } else {
      tempChecked.delete(nodeId);
      tempIndeterminate.delete(nodeId);
    }
  };

  ids.forEach(id => {
    const isChecked = tempChecked.has(id);
    toggleNodeAndChildren(
      id,
      forceCheck === undefined ? !isChecked : forceCheck,
    );
  });

  ids.forEach(id => {
    let currentNodeId = id;
    while (currentNodeId) {
      updateNodeAndAncestorsState(currentNodeId);
      currentNodeId = childToParentMap.get(currentNodeId);
    }
  });

  updateChecked(tempChecked);
  updateIndeterminate(tempIndeterminate);
}

export {toggleCheckboxes};
