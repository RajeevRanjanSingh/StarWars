/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import {AppContainer} from './Router';

class App extends React.Component {
  render(){
  return (
   <View style={{ flex: 1}}>
      <SafeAreaView style={{ flex: 1}}>
        <AppContainer/>
      </SafeAreaView>
      </View>
   
  );
  }
};

export default App;
