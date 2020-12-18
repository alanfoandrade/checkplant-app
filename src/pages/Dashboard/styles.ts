import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

import { RectButtonProperties } from 'react-native-gesture-handler';
import Button from '../../components/Button';

interface IMapMarkerContainerProps {
  synced: boolean;
}

export const Container = styled.View`
  padding: 8px;
  flex: 1;
`;

export const MapContainer = styled.View`
  background: #fff;
  border-radius: 8px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  overflow: hidden;
  flex: 1;
`;

export const Map = styled(MapView)`
  flex: 1;
`;

export const LoadingView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const LoadingText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #444;
`;

export const MapMarker = styled(Marker)`
  width: 80px;
  height: 50px;
`;

export const MapMarkerContainer = styled.View<IMapMarkerContainerProps>`
  width: 80px;
  height: 42px;
  background: ${(props) => (props.synced ? '#999' : '#34cb79')};
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerTitle = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 13px;
`;

export const MapMarkerDate = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 13px;
`;

export const Arrow = styled.View<IMapMarkerContainerProps>`
  position: absolute;
  bottom: 0;
  left: 35px;
  width: 0;
  height: 0;
  border-top-width: 8px;
  border-top-color: ${(props) => (props.synced ? '#999' : '#34cb79')};
  border-right-width: 5px;
  border-right-color: transparent;
  border-left-width: 5px;
  border-left-color: transparent;
`;

export const Footer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 8px;
`;

export const AddButton = styled(Button)`
  margin-right: 4px;
`;

export const SyncButton = styled(Button)<RectButtonProperties>`
  background: ${(props) => (props.enabled ? '#3482cb' : '#999')};
  margin-left: 4px;
`;
