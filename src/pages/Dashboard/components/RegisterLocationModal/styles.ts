import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled.View`
  background: #eee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 8px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #444;
  margin: 16px 0;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 12,
  textAlignVertical: 'top',
  maxLength: 628,
})`
  align-self: stretch;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(153, 153, 153, 0.5);
  border-radius: 8px;
  padding: 16px;
  color: #444;
  background: #fff;
  font-size: 16px;
  height: 262px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const SaveButton = styled(Button)`
  margin-right: 4px;
`;

export const CancelButton = styled(Button)`
  background: #c53030;
  margin-left: 4px;
`;
