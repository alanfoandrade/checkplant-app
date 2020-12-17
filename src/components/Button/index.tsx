import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonIcon, ButtonText } from './styles';

interface IButton extends RectButtonProperties {
  title: string;
  icon: string;
}

const Button: React.FC<IButton> = ({ title, icon, ...rest }) => (
  <Container {...rest}>
    <ButtonIcon>
      <Icon name={icon} size={24} color="#FFF" />
    </ButtonIcon>
    <ButtonText>{title}</ButtonText>
  </Container>
);

export default Button;
