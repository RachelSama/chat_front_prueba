// import axios from 'axios';
import { IonCol, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import classes from './ChatWindow.module.css'

import HeaderChat from '../../components/HeaderChat/HeaderChat';
import ChatMessageList from '../../components/ChatMessageList/ChatMessageList';
import ChatSubmit from '../../components/ChatSubmit/ChatSubmit';

import { Socket } from 'socket.io-client';

interface ChatWindowProps {
    socket: Socket;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ socket }) => {
    const [isTyping, setIsTyping] = useState(false);
    const { topic } = useParams<{ topic: string }>();
    const [roomName, setRoomName] = useState("");
    const history = useHistory();
    let welcomeBot = 0;

    useEffect(() => {
        const room = localStorage.getItem("roomName")
        if (room) {
            setRoomName(room)
        }
        socket.emit('getRoomData', roomName);
        socket.on('roomData', (messages) => {
            if (welcomeBot === 0 && messages.length === 0) {
                setIsTyping(true);
                setTimeout(() => {
                    socket.emit("message",
                        {
                            text: sendMessage(topic),
                            name: "Unobike",
                            id: `${socket.id}${Math.random()}`,
                            socketID: socket.id,
                            room: roomName,
                        }
                    )
                    setIsTyping(false);
                }, 2000);
                welcomeBot++;
            }
        })
    }, [topic, welcomeBot, roomName, socket, history]);

    const sendMessage = (selectedOption: string) => {
        let response = '';

        switch (selectedOption) {
            case 'compra':
                response = 'Parece que necesitas ayuda para comprar un articulo, ¿Qué es lo que estas buscando?';
                break;
            case 'pedido':
                response = 'Para consultar el estado de tu pedido, por favor indique el número de seguimiento.';
                break;
            case 'informacion':
                response = '¿Que información puedo ofrecerte?';
                break;
            default:
                response = 'Hola, soy Baiki, tu soporte personal de Unobike. ¿En qué puedo ayudarte?';
        }

        return response;
    };

    return (
        <IonPage style={{ display: 'block' }}>
            <IonGrid>
                <IonRow>
                    <IonCol sizeXs='12' sizeSm='8' sizeMd='6' sizeLg='5' sizeXl='3.5'>
                        <div className={classes.chatContent}>
                            <IonHeader>
                                <IonToolbar>
                                    <HeaderChat isTyping={isTyping} setIsTyping={setIsTyping} />
                                </IonToolbar>
                            </IonHeader>
                            <div className={classes.chatContentMessages}>
                                <ChatMessageList roomName={roomName} socket={socket} />
                            </div>
                            <ChatSubmit roomName={roomName} socket={socket} />
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
}

export default ChatWindow;


