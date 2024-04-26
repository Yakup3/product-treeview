import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {CHECKBOX_VALUES} from '../shared/constants';

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.value === nextProps.value && prevProps.text === nextProps.text
  );
}

export const CheckboxView = React.memo(_CheckboxView, arePropsEqual);

function _CheckboxView({value, onValueChange, text}) {
  const checkboxValueType = customCheckboxValueType => {
    return customCheckboxValueType === CHECKBOX_VALUES.INDETERMINATE
      ? CHECKBOX_VALUES.INDETERMINATE
      : customCheckboxValueType
      ? CHECKBOX_VALUES.CHECKED
      : CHECKBOX_VALUES.UNCHECKED;
  };

  const onValueChangeLocal = () => {
    if (value === CHECKBOX_VALUES.INDETERMINATE) {
      onValueChange(true);
    } else {
      onValueChange(!value);
    }
  };

  const renderCheckbox = () => {
    return (
      <View style={styles.checkboxView}>
        <Checkbox.Android
          status={checkboxValueType(value)}
          onPress={onValueChangeLocal}
        />
      </View>
    );
  };

  const renderText = () => {
    return text ? (
      <TouchableOpacity onPress={onValueChangeLocal}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={styles.mainView}>
      {renderCheckbox()}
      {renderText()}
    </View>
  );
}

export const styles = StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginEnd: 10,
  },
  checkboxView: {
    marginStart: 5,
  },
  text: {
    fontSize: 18,
  },
});
