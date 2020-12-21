import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View`
  background: #eee;
  border-radius: 8px;
  padding: 8px;

  justify-content: center;
  position: relative;
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  position: absolute;
  right: 8px;
  top: 8px;

  justify-content: center;
  align-items: center;
`;

export const DetailsHeader = styled.View`
  padding: 8px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #444;
  margin-top: 16px;
`;

export const Date = styled.Text`
  font-size: 16px;
  color: #444;
  margin: 8px 0;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 16,
  textAlignVertical: 'top',
})`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  border-radius: 10px;
  padding: 16px;
  color: #444;
  background: #fff;
  font-size: 16px;
  height: 338px;
`;
