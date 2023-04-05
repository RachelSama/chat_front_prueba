import React from 'react';
import { IonFab, IonFabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import classes from './ChatButton.module.css';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function ChatButton({ isOpen, onOpen, onClose }: Props) {
  const history = useHistory();

  const handleClick = () => {
    if (isOpen) {
      history.push('/');
      onClose();
    } else {
      history.push('/chat');
      onOpen();
    }
  };

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end" className="ion-margin">
      <IonFabButton color="danger" onClick={handleClick} className={classes.chatButton}>
        {isOpen ? 'X' : '💬'}
      </IonFabButton>
    </IonFab>
  );
}

export default ChatButton;
