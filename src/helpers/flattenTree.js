export function getFlattenedTreeData(nodes, expandedIds, level = 0) {
  let flattened = [];
  for (const node of nodes) {
    flattened.push({...node, level: level});
    if (node.children && expandedIds.has(node.id)) {
      flattened = flattened.concat(
        getFlattenedTreeData(node.children, expandedIds, level + 1),
      );
    }
  }
  return flattened;
}
