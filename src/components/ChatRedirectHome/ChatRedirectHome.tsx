import { IonButton, IonIcon } from '@ionic/react';
import { home } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import classes from './ChatRedirectHome.module.css'

function ChatRedirectHome() {

    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return (
        <IonButton fill="clear" onClick={() => handleClick()} className={classes.buttonHome} title="Inicio">
            <IonIcon slot="icon-only" icon={home} className={classes.iconHome} title="Inicio"/>
        </IonButton>
    );
}

export default ChatRedirectHome;
