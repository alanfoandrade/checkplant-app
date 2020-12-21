import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import { useLocations } from '../../../../hooks/locations';

import MapMarker from '../MapMarker';

import { MapContainer, RNMap, ToggleMapLayerButton } from './styles';

interface ILocation {
  annotation: string;
  latitude: number;
  longitude: number;
  datetime: string;
  parsedDate: string;
  synced: boolean;
}

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IMapRef {
  animateToRegion(region: IRegion): void;
}

interface IMapProps extends MapViewProps {
  handleDetails(location: ILocation): void;
}

const Map: React.ForwardRefRenderFunction<IMapRef, IMapProps> = (
  { handleDetails, ...rest },
  ref,
) => {
  const mapRef = useRef<MapView>(null);

  const { locations } = useLocations();

  const [mapReady, setMapReady] = useState(1);
  const [mapType, setMapType] = useState<'standard' | 'hybrid'>('standard');

  useImperativeHandle(ref, () => ({
    animateToRegion(region: IRegion) {
      mapRef.current?.animateToRegion(region);
    },
  }));

  const toggleMapType = useCallback(() => {
    if (mapType === 'standard') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  }, [mapType]);

  return (
    <MapContainer style={{ paddingTop: mapReady }}>
      <RNMap
        ref={mapRef}
        mapType={mapType}
        onMapReady={() => setMapReady(0)}
        {...rest}
      >
        {!!locations.length &&
          locations.map((location, index) => (
            <MapMarker
              key={String(index)}
              location={location}
              index={index}
              handleDetails={() => handleDetails(location)}
            />
          ))}
      </RNMap>
      <ToggleMapLayerButton mapType={mapType} onPress={toggleMapType}>
        <Icon name="layers" size={24} color="#444" />
      </ToggleMapLayerButton>
    </MapContainer>
  );
};

export default forwardRef(Map);
