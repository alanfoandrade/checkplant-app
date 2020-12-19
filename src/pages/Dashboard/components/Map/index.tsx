import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import { useLocations } from '../../../../hooks/locations';
import MapMarker from '../MapMarker';

import { MapContainer, RNMap } from './styles';

interface ILocation {
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  parsedDates: string[];
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

  useImperativeHandle(ref, () => ({
    animateToRegion(region: IRegion) {
      mapRef.current?.animateToRegion(region);
    },
  }));

  return (
    <MapContainer style={{ paddingTop: mapReady }}>
      <RNMap ref={mapRef} onMapReady={() => setMapReady(0)} {...rest}>
        {!!locations.length &&
          locations.map((location, index) => (
            <MapMarker
              key={String(location.date)}
              location={location}
              index={index}
              handleDetails={() => handleDetails(location)}
            />
          ))}
      </RNMap>
    </MapContainer>
  );
};

export default forwardRef(Map);
