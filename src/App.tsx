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

setupIonicReact();

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <ChatButton isOpen={isChatOpen} onOpen={handleChatOpen} onClose={handleChatClose} />
        <IonRouterOutlet>
          <Route exact path="/chat" component={ChatWelcome} />
          <Route exact path="/chat/:topic" component={ChatWindow} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
