import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {mockData} from './src/shared/data';
import TreeView from './src/components/TreeView';
import {initializeNodeMaps} from './src/helpers';
import {useTreeViewStore} from './src/store/treeView.store';
import SelectedValues from './src/components/SelectedValues';

function App() {
  const {updateInitialTreeViewData} = useTreeViewStore();

  React.useEffect(() => {
    updateInitialTreeViewData(mockData);
    initializeNodeMaps(mockData);
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <TreeView />
      <SelectedValues />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
