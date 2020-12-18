import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';

import {
  Container,
  Content,
  Title,
  ButtonsContainer,
  SaveButton,
  CancelButton,
  TextArea,
} from './styles';

interface IRegisterLocationModalProps {
  visible: boolean;
  toggleVisible(_: boolean): void;
  onSave(_: string): void;
}

const RegisterLocationModal: React.FC<IRegisterLocationModalProps> = ({
  visible,
  toggleVisible,
  onSave,
}) => {
  const [locationDescription, setLocationDescription] = useState('');

  const handleRegisterLocation = useCallback(() => {
    onSave(locationDescription);
    setLocationDescription('');
    toggleVisible(!visible);
  }, [locationDescription, onSave, toggleVisible, visible]);

  const handleCancel = useCallback(() => {
    toggleVisible(!visible);
  }, [toggleVisible, visible]);

  return (
    <Modal
      coverScreen={false}
      useNativeDriver
      avoidKeyboard
      isVisible={visible}
      style={{ marginHorizontal: 8, marginVertical: 0 }}
    >
      <Container>
        <Content>
          <Title>Registrar localização atual</Title>

          <TextArea onChangeText={setLocationDescription} />

          <ButtonsContainer>
            <SaveButton
              title="Salvar"
              icon="save"
              onPress={handleRegisterLocation}
            />

            <CancelButton
              title="Cancelar"
              icon="log-out"
              onPress={handleCancel}
            />
          </ButtonsContainer>
        </Content>
      </Container>
    </Modal>
  );
};

export default RegisterLocationModal;
