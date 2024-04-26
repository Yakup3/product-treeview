import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ExpandCollapseIcon = React.memo(_ExpandCollapseIcon);

function _ExpandCollapseIcon({isExpanded}) {
  return (
    <Icon
      name={isExpanded ? 'chevron-down' : 'chevron-right'}
      size={15}
      color="black"
    />
  );
}
