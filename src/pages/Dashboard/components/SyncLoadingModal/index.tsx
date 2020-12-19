import React from 'react';
import { ActivityIndicator, Modal, ModalBaseProps } from 'react-native';

import { Container, Content, SyncText } from './styles';

const SyncLoadingModal: React.FC<ModalBaseProps> = (props) => {
  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...props}>
      <Container>
        <Content>
          <ActivityIndicator animating size="large" color="#444" />
          <SyncText>Sincronização em andamento…</SyncText>
        </Content>
      </Container>
    </Modal>
  );
};

export default SyncLoadingModal;
