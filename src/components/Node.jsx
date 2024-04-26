import {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {CheckboxView} from './CheckboxView';
import {ExpandCollapseIcon} from './ExpandCollapseIcon';
import {CHECKBOX_VALUES} from '../shared/constants';
import {useTreeViewStore} from '../store/treeView.store';
import {handleToggleExpand, toggleCheckboxes} from '../helpers';

function getValue(isChecked, isIndeterminate) {
  if (isIndeterminate) {
    return CHECKBOX_VALUES.INDETERMINATE;
  }

  return isChecked;
}

const Node = memo(_Node);
export default Node;

function _Node({node, level}) {
  const {expanded, checked, indeterminate} = useTreeViewStore();

  const isChecked = checked.has(node.id);
  const isIndeterminate = indeterminate.has(node.id);
  const isExpanded = expanded.has(node.id);

  const [value, setValue] = useState(getValue(isChecked, isIndeterminate));

  useEffect(() => {
    setValue(getValue(isChecked, isIndeterminate));
  }, [isChecked, isIndeterminate]);

  const onToggleExpand = useCallback(() => {
    handleToggleExpand(node.id);
  }, [node.id]);

  const onCheck = useCallback(() => {
    toggleCheckboxes([node.id]);
  }, [node.id]);

  const renderCheckboxView = useCallback(() => {
    return (
      <CheckboxView text={node.name} onValueChange={onCheck} value={value} />
    );
  }, [node.name, onCheck, value]);

  const renderExpandableArrow = useCallback(() => {
    return node.children?.length ? (
      <TouchableOpacity onPress={onToggleExpand}>
        <ExpandCollapseIcon isExpanded={isExpanded} />
      </TouchableOpacity>
    ) : null;
  }, [onToggleExpand, node.children, isExpanded]);

  return (
    <View style={[styles.checkboxAndArrowRow, {paddingStart: level * 15}]}>
      {renderCheckboxView()}
      {renderExpandableArrow()}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxAndArrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
  },
});
