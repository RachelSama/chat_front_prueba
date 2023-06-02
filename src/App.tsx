import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
import ChatButton from './components/ChatButton/ChatButton';
import ChatWelcome from './pages/ChatWelcome/ChatWelcome';
import ChatWindow from './pages/ChatWindow/ChatWindow';
import Home from './pages/Home/Home';
import socketIO from "socket.io-client"


setupIonicReact();

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const socket = socketIO("http://localhost:4000");

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <ChatButton isOpen={isChatOpen} onOpen={handleChatOpen} onClose={handleChatClose} socket={socket} />
        <IonRouterOutlet>
          <Route path="/login">
            <Home socket={socket} />
          </Route>
          <Route exact path="/chat">
            <ChatWelcome socket={socket} />
          </Route>
          <Route exact path="/chat/:topic">
            <ChatWindow socket={socket} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
