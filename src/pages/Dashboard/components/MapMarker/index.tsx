import React from 'react';

import {
  RNMarker,
  MapMarkerContainer,
  MapMarkerTitle,
  MapMarkerDate,
  Arrow,
} from './styles';

interface ILocation {
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  parsedDates: string[];
  synced: boolean;
}

interface IMapMarkerProps {
  location: ILocation;
  index: number;
  handleDetails(): void;
}

const MapMarker: React.FC<IMapMarkerProps> = ({
  location,
  index,
  handleDetails,
}) => {
  return (
    <RNMarker
      onPress={handleDetails}
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
    </RNMarker>
  );
};

export default MapMarker;
