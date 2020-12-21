import { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

interface IMapMarkerContainerProps {
  synced: boolean;
}

export const RNMarker = styled(Marker)`
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
