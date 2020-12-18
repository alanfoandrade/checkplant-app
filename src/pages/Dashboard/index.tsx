import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  MapContainer,
  Map,
  MapMarker,
  MapMarkerContainer,
  MapMarkerTitle,
  MapMarkerDate,
  Arrow,
  LoadingView,
  LoadingText,
  Footer,
  AddButton,
  SyncButton,
} from './styles';
import LocationDetailsModal from './components/LocationDetailsModal';
import RegisterLocationModal from './components/RegisterLocationModal';
import { useLocations } from '../../hooks/locations';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface ILocation {
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  parsedDates: string[];
  synced: boolean;
}

const Dashboard: React.FC = () => {
  const { width, height } = Dimensions.get('window');

  const mapRef = useRef<MapView>(null);

  const { locations, registerLocation } = useLocations();

  const [locationDetailed, setLocationDetailed] = useState<ILocation>();
  const [hasUnsyncedLocations, setHasUnsyncedLocations] = useState(false);
  const [mapReady, setMapReady] = useState(1);
  const [mapType, setMapType] = useState<'standard' | 'hybrid'>('standard');
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

  Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setCurrentLocation((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));

      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011 * (width / height),
      });
    },
    () => ({}),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  );

  useEffect(() => {
    setHasUnsyncedLocations(!!locations.find((location) => !location.synced));
  }, [locations]);

  const handleAdd = useCallback(() => {
    setRegisterLocationModalVisible(true);
  }, []);

  const handleDetails = useCallback((location) => {
    setLocationDetailed(location);
    setLocationDetailsModalVisible(true);
  }, []);

  const handleSync = useCallback(() => {
    setLocations((prevState) =>
      prevState.map((location) => ({
        ...location,
        synced: true,
      })),
    );
    setHasUnsyncedLocations(false);
  }, []);

  const handleSubmit = useCallback(
    (locationDescription: string) => {
      const now = new Date();
      const shortDate = format(now, "dd'/'MM'/'yyyy");
      const longDate = format(now, "dd 'de' MMMM 'de' yyyy 'às' HH':'mm'h'", {
        locale: ptBR,
      });

      registerLocation({
        description: locationDescription,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        date: now,
        synced: false,
        parsedDates: [shortDate, longDate],
      });

      setHasUnsyncedLocations(true);
    },
    [currentLocation.latitude, currentLocation.longitude, registerLocation],
  );

  return (
    <Container>
      <MapContainer style={{ paddingTop: mapReady }}>
        {(currentLocation.latitude !== 0 && (
          <Map
            ref={mapRef}
            initialRegion={currentLocation}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            mapType={mapType}
            showsCompass
            zoomControlEnabled
            showsMyLocationButton
            onMapReady={() => setMapReady(0)}
          >
            {!!locations.length &&
              locations.map((location, index) => (
                <MapMarker
                  key={String(location.date)}
                  onPress={() => handleDetails(location)}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                >
                  <MapMarkerContainer synced={location.synced}>
                    <MapMarkerTitle>
                      {/* eslint-disable-next-line prettier/prettier */}
                      Local
                      {' '}
                      {index}
                    </MapMarkerTitle>
                    <MapMarkerDate>{location.parsedDates[0]}</MapMarkerDate>
                  </MapMarkerContainer>
                  <Arrow synced={location.synced} />
                </MapMarker>
              ))}
          </Map>
        )) || (
          <LoadingView>
            <LoadingText>Encontrando sua localização...</LoadingText>
          </LoadingView>
        )}
      </MapContainer>

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

      <Footer>
        <AddButton title="Adicionar" icon="plus" onPress={handleAdd} />
        <SyncButton
          enabled={hasUnsyncedLocations}
          title="Sincronizar"
          icon="refresh-cw"
          onPress={handleSync}
        />
      </Footer>
    </Container>
  );
};

export default Dashboard;
