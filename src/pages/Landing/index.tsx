import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Logo,
  TextGreen,
  TextBlue,
  TextBold,
  WelcomeText,
  EnterButton,
  ButtonText,
  IconContainer,
} from './styles';

import logoImg from '../../assets/logo.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>
      <Logo source={logoImg} resizeMode="contain" />
      <WelcomeText>
        <TextBold>Seja bem vindo,</TextBold>
        {'\n'}
        aqui você poderá <TextGreen>salvar</TextGreen> e{' '}
        <TextBlue>sincronizar</TextBlue> seus locais favoritos.
      </WelcomeText>

      <EnterButton onPress={handleNavigate}>
        <ButtonText>Começar marcar seus locais</ButtonText>
        <IconContainer>
          <Icon name="log-in" size={24} color="#fff" />
        </IconContainer>
      </EnterButton>
    </Container>
  );
};

export default Landing;
