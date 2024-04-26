import React, {useState, useEffect, useCallback, memo} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import Node from './Node';
import {getFlattenedTreeData} from '../helpers';
import {ScreenHeight} from '../shared/constants';
import {useTreeViewStore} from '../store/treeView.store';

const TreeView = memo(_TreeView);
export default TreeView;

function _TreeView() {
  const {expanded, initialTreeViewData} = useTreeViewStore();

  const [flattenedFilteredNodes, setFlattenedFilteredNodes] = useState([]);

  useEffect(() => {
    const tempFlattenTreeData = getFlattenedTreeData(
      initialTreeViewData,
      expanded,
    );
    setFlattenedFilteredNodes(tempFlattenTreeData);
  }, [initialTreeViewData, expanded]);

  const renderTitle = useCallback(
    () => <Text style={styles.title}>Browse Products:</Text>,
    [],
  );

  const renderItem = useCallback(({item}) => (
    <Node node={item} level={item.level || 0} />
  ));

  const renderFlatList = useCallback(
    () => <FlatList data={flattenedFilteredNodes} renderItem={renderItem} />,
    [flattenedFilteredNodes],
  );

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderFlatList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: ScreenHeight * 0.4,
    borderBottomWidth: 1,
    backgroundColor: 'lightgray',
  },
  title: {
    padding: 15,
    fontWeight: '600',
    fontSize: 22,
  },
});
