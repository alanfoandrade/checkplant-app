import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

import Button from '../../components/Button';

export const Container = styled.View`
  padding: 8px;
  flex: 1;
  background: #ddd;
`;

export const MapContainer = styled.View`
  background: #fff;
  border-radius: 10px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  overflow: hidden;
  flex: 1;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 70px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 64px;
  background: #34cb79;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerImage = styled.Image`
  width: 90px;
  height: 45px;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto-Medium';
  color: #fff;
  font-size: 13px;
`;

export const Arrow = styled.View`
  position: absolute;
  bottom: 0;
  left: 37px;
  width: 0;
  height: 0;
  border-top-width: 8px;
  border-top-color: #34cb79;
  border-right-width: 5px;
  border-right-color: transparent;
  border-left-width: 5px;
  border-left-color: transparent;
`;

export const Footer = styled.View`
  background: #ddd;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 8px;
`;

export const AddButton = styled(Button)`
  margin-right: 4px;
`;

export const SyncButton = styled(Button)`
  background: #3482cb;
  margin-left: 4px;
`;
