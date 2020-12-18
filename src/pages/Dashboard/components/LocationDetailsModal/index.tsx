import React, { useCallback } from 'react';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/Feather';

import {
  Container,
  Content,
  CloseButton,
  DetailsHeader,
  Title,
  Date,
  TextArea,
} from './styles';

interface ILocation {
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  parsedDates: string[];
  synced: boolean;
}

interface ILocationDetailsModalProps {
  visible: boolean;
  toggleVisible(_: boolean): void;
  location: ILocation;
}

const LocationDetailsModal: React.FC<ILocationDetailsModalProps> = ({
  visible,
  toggleVisible,
  location,
}) => {
  const handleClose = useCallback(() => {
    toggleVisible(!visible);
  }, [toggleVisible, visible]);

  return (
    <Modal
      coverScreen={false}
      useNativeDriver
      isVisible={visible}
      style={{ marginHorizontal: 8, marginVertical: 0 }}
    >
      <Container>
        <Content>
          <CloseButton onPress={handleClose}>
            <MaterialIcon name="x" size={32} color="#444" />
          </CloseButton>

          <DetailsHeader>
            <Title>Detalhes do local</Title>
            <Date>
              Local salvo em:
              {'\n'}
              {location.parsedDates[1]}
            </Date>
          </DetailsHeader>

          <TextArea editable={false}>{location.description}</TextArea>
        </Content>
      </Container>
    </Modal>
  );
};

export default LocationDetailsModal;
