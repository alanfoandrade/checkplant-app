import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Button from '../../components/Button';

import { Container, MapContainer, Footer, SyncButton } from './styles';

const Dashboard: React.FC = () => {
  const locations: string[] = useMemo(() => [], []);

  const handleAdd = useCallback(() => {
    locations.push('novo');
  }, [locations]);

  const handleSync = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('sincronizando...');
  }, []);

  return (
    <Container>
      <MapContainer>
        <View />
      </MapContainer>
      <Footer>
        <Button title="Adicionar" icon="plus" onPress={handleAdd} />
        <SyncButton
          title="Sincronizar"
          icon="refresh-cw"
          onPress={handleSync}
        />
      </Footer>
    </Container>
  );
};

export default Dashboard;
