import {useTreeViewStore} from '../store/treeView.store';

export function initializeNodeMaps(initialData) {
  const {updateNodeMap, updateChildToParentMap} = useTreeViewStore.getState();

  const tempNodeMap = new Map();
  const tempChildToParentMap = new Map();

  const processNodes = (nodes, parentId = null) => {
    nodes.forEach(node => {
      tempNodeMap.set(node.id, node);

      if (parentId) {
        tempChildToParentMap.set(node.id, parentId);
      }

      if (node.children) {
        processNodes(node.children, node.id);
      }
    });
  };

  processNodes(initialData);

  updateNodeMap(tempNodeMap);
  updateChildToParentMap(tempChildToParentMap);
}
