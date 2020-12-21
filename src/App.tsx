import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#eee" />
    <AppProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
        <Routes />
      </SafeAreaView>
    </AppProvider>
  </NavigationContainer>
);

export default App;
