import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PROVIDER_GOOGLE } from 'react-native-maps';

import {
  Container,
  MapContainer,
  Map,
  Footer,
  AddButton,
  SyncButton,
} from './styles';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const Dashboard: React.FC = () => {
  const { width, height } = Dimensions.get('window');

  const locations: string[] = useMemo(() => [], []);

  const [mapReady, setMapReady] = useState(1);
  const [currentLocation, setCurrentLocation] = useState<IRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.011,
    longitudeDelta: 0.011 * (width / height),
  });

  useEffect(() => {
    async function loadCurrentPosition() {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission !== 'granted') {
        Alert.alert(
          'Ooops...',
          'Precisamos de sua permissão para saber a sua localização',
        );
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCurrentLocation((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
        },
        () => {
          Alert.alert(
            'Ooops...',
            'Ocorreu algum erro ao obter a sua localização',
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
    loadCurrentPosition();
  }, []);

  const handleAdd = useCallback(() => {
    locations.push('novo');
  }, [locations]);

  const handleSync = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('sincronizando...');
  }, []);

  return (
    <Container>
      <MapContainer style={{ paddingTop: mapReady }}>
        {currentLocation.latitude !== 0 && (
          <Map
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            followsUserLocation
            showsMyLocationButton
            onMapReady={() => setMapReady(0)}
            initialRegion={currentLocation}
          />
        )}
      </MapContainer>
      <Footer>
        <AddButton title="Adicionar" icon="plus" onPress={handleAdd} />
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
