import { IonCard, IonContent, IonGrid, IonRow } from '@ionic/react';
import classes from './ChatMessageList.module.css';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

interface ChatMessageListProps {
    roomName: string;
    socket: Socket;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ roomName, socket }) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.emit('getRoomData', roomName);
        socket.on("roomData", data => setMessages(data));
    }, [roomName, messages, socket]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

    function formatDateTime(timestamp: string) {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <IonCard className={classes.cardChat}>
            <IonContent>
                <IonGrid>
                    <div className={classes.messageContainer}>
                        {messages.map((message, index) => {
                            const parsedMessage = JSON.parse(message);
                            const formattedDateTime = formatDateTime(parsedMessage.timestamp);

                            return parsedMessage.user === 'Unobike' ? (
                                <IonRow className={classes.messageRow} key={index} style={{ flexDirection: 'row' }}>
                                    {/* <p className={classes.messageCol}>Tú</p> */}
                                    <div
                                        className={classes.messageCol}
                                        style={{
                                            backgroundColor: '#ac3939',
                                            color: 'white',
                                        }}
                                    >
                                        <p>{parsedMessage.text}</p>
                                        <p className={classes.message__timestamp}>{formattedDateTime}</p>
                                    </div>
                                    <div ref={messagesEndRef} />
                                </IonRow>
                            ) : (
                                <IonRow className={classes.messageRow} key={index} style={{ flexDirection: 'row-reverse' }}>
                                    {/* <p className={classes.messageCol}>{parsedMessage.user}</p> */}
                                    <div
                                        className={classes.messageCol}
                                        style={{
                                            backgroundColor: '#c5c5c5',
                                            color: 'black',
                                        }}
                                    >
                                        <p>{parsedMessage.text}</p>
                                        <p className={classes.message__timestamp}>{formattedDateTime}</p>
                                    </div>
                                    <div ref={messagesEndRef} />
                                </IonRow>
                            );
                        })}
                    </div>
                    <div ref={messagesEndRef} />
                </IonGrid>
            </IonContent>
        </IonCard>
    );
};

export default ChatMessageList;
