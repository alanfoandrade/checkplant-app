import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Dashboard from '../pages/Dashboard';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
