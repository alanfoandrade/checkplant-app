import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

export const MapContainer = styled.View`
  background: #fff;
  border-radius: 8px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  overflow: hidden;
  flex: 1;
`;

export const RNMap = styled(MapView)`
  flex: 1;
`;
