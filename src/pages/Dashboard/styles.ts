import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

import { RectButtonProperties } from 'react-native-gesture-handler';
import Button from '../../components/Button';

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
  margin-top: 16px;
`;

export const GetPositionButton = styled(Button)`
  background: #3482cb;
  margin: 0 32px;
`;

export const Footer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 8px;
`;

export const AddButton = styled(Button)`
  margin-right: 4px;
  flex: 1;
`;

export const SyncButton = styled(Button)<RectButtonProperties>`
  background: ${(props) => (props.enabled ? '#3482cb' : '#999')};
  margin-left: 4px;
  flex: 1;
`;
