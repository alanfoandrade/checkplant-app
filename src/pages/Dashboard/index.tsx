import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from './components/Map';

import { useLocations } from '../../hooks/locations';
import LocationDetailsModal from './components/LocationDetailsModal';
import RegisterLocationModal from './components/RegisterLocationModal';
import SyncLoadingModal from './components/SyncLoadingModal';

import {
  Container,
  LoadingView,
  LoadingText,
  GetPositionButton,
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

interface ILocation {
  annotation: string;
  latitude: number;
  longitude: number;
  datetime: string;
  parsedDate: string;
  synced: boolean;
}

const Dashboard: React.FC = () => {
  const { width, height } = Dimensions.get('window');

  const mapRef = useRef<MapView>(null);

  const { synced, loading, registerLocation, syncLocations } = useLocations();

  const [getPositionError, setGetPositionError] = useState(false);
  const [locationDetailed, setLocationDetailed] = useState<ILocation>();
  const [
    registerLocationModalVisible,
    setRegisterLocationModalVisible,
  ] = useState(false);
  const [
    locationDetailsModalVisible,
    setLocationDetailsModalVisible,
  ] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<IRegion>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.011,
    longitudeDelta: 0.011 * (width / height),
  });

  const loadCurrentPosition = useCallback(async () => {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (permission !== 'granted') {
      setGetPositionError(true);

      Alert.alert(
        'Ooops...',
        'Precisamos de sua permissão para saber a sua localização',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setGetPositionError(false);

        const { latitude, longitude } = position.coords;

        setCurrentLocation((prevState) => ({
          ...prevState,
          latitude,
          longitude,
        }));
      },
      () => {
        setGetPositionError(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    loadCurrentPosition();
  }, [loadCurrentPosition]);

  Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));

      mapRef.current?.animateToRegion({
        ...currentLocation,
        latitude,
        longitude,
      });
    },
    () => ({}),
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 150,
    },
  );

  const handleRetryGetPosition = useCallback(() => {
    setGetPositionError(false);
    loadCurrentPosition();
  }, [loadCurrentPosition]);

  const handleAdd = useCallback(() => {
    setRegisterLocationModalVisible(true);
  }, []);

  const handleDetails = useCallback((location) => {
    setLocationDetailed(location);
    setLocationDetailsModalVisible(true);
  }, []);

  const handleSync = useCallback(() => {
    syncLocations();
  }, [syncLocations]);

  const handleSubmit = useCallback(
    (locationDescription: string) => {
      registerLocation({
        annotation: locationDescription,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    },
    [currentLocation.latitude, currentLocation.longitude, registerLocation],
  );

  return (
    <Container>
      {(currentLocation.latitude !== 0 && (
        <>
          <Map
            ref={mapRef}
            initialRegion={currentLocation}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsCompass
            zoomControlEnabled
            showsMyLocationButton
            handleDetails={(location) => handleDetails(location)}
          />

          <RegisterLocationModal
            visible={registerLocationModalVisible}
            toggleVisible={setRegisterLocationModalVisible}
            onSave={(locationDescription) => handleSubmit(locationDescription)}
          />

          {locationDetailed && (
            <LocationDetailsModal
              visible={locationDetailsModalVisible}
              toggleVisible={setLocationDetailsModalVisible}
              location={locationDetailed}
            />
          )}

          <SyncLoadingModal visible={loading} />

          <Footer>
            <AddButton title="Adicionar" icon="plus" onPress={handleAdd} />
            <SyncButton
              enabled={!synced}
              title="Sincronizar"
              icon="refresh-cw"
              onPress={handleSync}
            />
          </Footer>
        </>
      )) || (
        <LoadingView>
          {(!getPositionError && (
            <>
              <ActivityIndicator animating size="large" color="#444" />
              <LoadingText>Encontrando sua localização...</LoadingText>
            </>
          )) || (
            <>
              <LoadingText>
                Ocorreu algum erro ao obter a sua localização
              </LoadingText>
              <GetPositionButton
                title="Localizar novamente"
                icon="map-pin"
                onPress={handleRetryGetPosition}
              />
            </>
          )}
        </LoadingView>
      )}
    </Container>
  );
};

export default Dashboard;
