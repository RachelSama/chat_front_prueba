import { IonIcon } from '@ionic/react';
import { home } from 'ionicons/icons';
import ChatButton from '../ChatButton/ChatButton';
import classes from './ChatRedirectHome.module.css'

function ChatRedirectHome() {
    
    const handleSubmit = () => {
        <ChatButton isOpen={true} isWelcome={false}/>
    };

    return (
        <IonIcon icon={home} className={classes.iconHome} title="Inicio" onClick={handleSubmit} />
    );
}

export default ChatRedirectHome;