import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';

interface IToggleMapLayerButtonProps {
  mapType: 'standard' | 'hybrid';
}

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
  position: relative;
`;

export const ToggleMapLayerButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IToggleMapLayerButtonProps>`
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.mapType === 'standard'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(52, 130, 203, 0.6)'};
  border-width: 1px;
  border-color: rgba(68, 68, 68, 0.1);
  position: absolute;
  top: 60px;
  right: 11px;
  align-items: center;
  justify-content: center;
  elevation: 1;
`;
