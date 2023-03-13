import { IonCard } from '@ionic/react';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import classes from './ChatMessageList.module.css'

function ChatMessageList(props: { messages: { message: string; isBot: boolean; }[]; }) {
    return (
        <IonCard className={classes.cardChat}>
            {props.messages.map((msg: { message: string; isBot: boolean; }, index: number) => (
                <ChatMessage key={index} message={msg.message} isBot={msg.isBot} />
            ))}
        </IonCard>
    );
};

export default ChatMessageList;