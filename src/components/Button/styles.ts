import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #34cb79;
  height: 60px;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled.View`
  height: 60px;
  width: 60px;
  background: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
