import { IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import classes from './ChatMessage.module.css'

interface Props {
  message: string;
  isBot: boolean;
}

function ChatMessage({ message, isBot }: Props) {
  return (

    <IonGrid>
      <IonRow className={classes.messageRow}
        style={{
          flexDirection: isBot ? 'row' : 'row-reverse',
        }}>
        <div className={classes.messageCol} 
        style={{
          backgroundColor: isBot ? '#ac3939' : '#c5c5c5',
          color: isBot ? 'white' : 'black',
        }}>
          {message}
        </div>
      </IonRow>
    </IonGrid>
  );
}

export default ChatMessage;
