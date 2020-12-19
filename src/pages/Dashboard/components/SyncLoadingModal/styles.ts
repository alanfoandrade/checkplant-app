import styled from 'styled-components/native';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.3);

  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const Content = styled.View`
  background: #eee;
  border-radius: 8px;
  padding: 32px;

  align-items: center;
  justify-content: center;
`;

export const SyncText = styled.Text`
  color: #444;
  font-size: 16px;
  margin-top: 16px;
`;
