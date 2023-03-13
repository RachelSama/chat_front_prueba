import { IonFab, IonFabButton } from '@ionic/react';
import React, { useState } from 'react';
import ChatWelcome from '../../pages/ChatWelcome/ChatWelcome';
import ChatWindow from '../../pages/ChatWindow/ChatWindow';

import classes from './ChatButton.module.css'

interface ChatButtonProps {
  isOpen: boolean;
  isWelcome: boolean;
}

// ============= Hacer que los props sean opcionales ======================

function ChatButton(props: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsWelcome(true)
  }

  return (
    <>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" className='ion-margin'>
          {isOpen && !isWelcome && <ChatWelcome handleOptionSelect={handleOptionSelect} />}
          {isOpen && isWelcome && <ChatWindow selectedOption={selectedOption} />}
          <IonFabButton color="danger" onClick={handleClick} className={classes.chatButton}>
            {isOpen ? 'X' : '💬'}
          </IonFabButton>
        </IonFab>
    </>
  );
}

export default ChatButton;
