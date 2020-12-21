import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: #eee;
  padding: 32px;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
`;

export const Logo = styled.Image`
  width: 100%;
  margin-top: 16px;
`;

export const WelcomeText = styled.Text`
  color: #444;
  font-size: 20px;
  line-height: 24px;
  align-self: flex-start;
`;

export const TextBold = styled.Text`
  line-height: 32px;
  font-weight: bold;
`;

export const TextGreen = styled.Text`
  font-weight: bold;
  color: #34cb79;
`;

export const TextBlue = styled.Text`
  font-weight: bold;
  color: #3482cb;
`;

export const EnterButton = styled(RectButton)`
  height: 60px;
  background: #34cb79;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  flex: 1;
  text-align: center;
`;

export const IconContainer = styled.View`
  width: 60px;
  height: 60px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.1);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  justify-content: center;
`;
