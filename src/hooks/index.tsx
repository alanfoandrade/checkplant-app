import React from 'react';

import { LocationsProvider } from './locations';

const AppProvider: React.FC = ({ children }) => (
  <LocationsProvider>{children}</LocationsProvider>
);

export default AppProvider;
