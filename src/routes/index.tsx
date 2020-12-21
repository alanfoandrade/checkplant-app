import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Routes;
