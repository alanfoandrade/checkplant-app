import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  padding: 8px;
  flex: 1;
  background: #ddd;
`;

export const MapContainer = styled.View`
  background: #fff;
  border-radius: 10px;
  flex: 1;
`;

export const Footer = styled.View`
  background: #ddd;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const SyncButton = styled(Button)`
  background: #3482cb;
`;
