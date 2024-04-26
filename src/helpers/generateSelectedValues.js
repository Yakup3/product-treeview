export function generateSelectedValue(checked, nodeMap, childToParentMap) {
  const descriptions = new Set();

  function hasAncestorInDescriptions(id) {
    let currentId = id;
    while (currentId) {
      const parentId = childToParentMap.get(currentId);
      if (parentId && descriptions.has(`all ${nodeMap.get(parentId).name}`)) {
        return true;
      }
      currentId = parentId;
    }
    return false;
  }

  function removeDescendantsFromDescriptions(node) {
    if (node.children) {
      node.children.forEach(child => {
        const childName =
          child.children == null
            ? `${node.name} ${child.name}`
            : `all ${child.name}`;
        descriptions.delete(childName);
        const childNode = nodeMap.get(child.id);
        if (childNode) {
          removeDescendantsFromDescriptions(childNode);
        }
      });
    }
  }

  checked.forEach(id => {
    if (hasAncestorInDescriptions(id)) {
      return;
    }

    const node = nodeMap.get(id);

    if (node) {
      const parentId = childToParentMap.get(id);

      if (node.children) {
        const allChildrenIds = node.children.map(child => child.id);
        const allChildrenChecked = allChildrenIds.every(childId =>
          checked.has(childId),
        );

        if (allChildrenChecked) {
          descriptions.add(`all ${node.name}`);
          removeDescendantsFromDescriptions(node);
        } else {
          node.children.forEach(child => {
            if (checked.has(child.id)) {
              descriptions.add(`${node.name} ${child.name}`);
            }
          });
        }
      } else {
        const parentName = parentId ? nodeMap.get(parentId).name : null;
        const descriptionText = parentName
          ? `${parentName} ${node.name}`
          : `${node.name}`;
        descriptions.add(descriptionText);
      }
    }
  });

  return Array.from(descriptions);
}
