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
  annotation: string;
  latitude: number;
  longitude: number;
  datetime: string;
  parsedDate: string;
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
              Local salvo em:{'\n'}
              {location.parsedDate}
            </Date>
          </DetailsHeader>

          <TextArea editable={false}>{location.annotation}</TextArea>
        </Content>
      </Container>
    </Modal>
  );
};

export default LocationDetailsModal;
