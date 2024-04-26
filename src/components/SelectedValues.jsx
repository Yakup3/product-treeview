import React, {memo, useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {generateSelectedValue} from '../helpers';
import {useTreeViewStore} from '../store/treeView.store';

const SelectedValues = memo(_SelectedValues);
export default SelectedValues;

function _SelectedValues() {
  const {checked, nodeMap, childToParentMap} = useTreeViewStore();
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    const tempSelectedValues = generateSelectedValue(
      checked,
      nodeMap,
      childToParentMap,
    );
    setSelectedValues(tempSelectedValues);
  }, [checked, nodeMap]);

  const renderTitle = useCallback(
    () => <Text style={styles.title}>Selected Values:</Text>,
    [],
  );

  const renderItem = useCallback(
    ({item}) => <Text style={styles.textItem}>{item}</Text>,
    [],
  );

  const renderFlatList = useCallback(() => {
    return (
      selectedValues.length > 0 && (
        <FlatList
          data={selectedValues}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          contentContainerStyle={styles.flatListContainer}
        />
      )
    );
  }, [selectedValues, renderItem]);

  const renderNoItemSelected = useCallback(() => {
    return (
      selectedValues.length === 0 && (
        <Text style={styles.noItemsText}>No items selected.</Text>
      )
    );
  }, [selectedValues]);

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderFlatList()}
      {renderNoItemSelected()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
  },
  textItem: {
    fontSize: 14,
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
  flatListContainer: {
    gap: 10,
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
