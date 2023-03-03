import {
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonMenuButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonDatetime,
    IonButton,
    IonToast
} from "@ionic/react";
import { useHistory } from 'react-router-dom'
import React, { useRef, useContext, useState } from "react";
import ActivitiesContext, { ActivityType } from "../../data/activities-context";
import './AddActivity.module.css';

const AddActivity: React.FC = () => {

    const history = useHistory()

    const titleInput = useRef<HTMLIonInputElement>(null);
    const descriptionInput = useRef<HTMLIonInputElement>(null);
    const activityInput = useRef<HTMLIonSegmentElement>(null);
    const hourInput = useRef<HTMLIonDatetimeElement>(null);

    const activitiesCtxt = useContext(ActivitiesContext);

    const [toastMsg, setToastMsg] = useState<string>('')

    const addActivity = () => {
        const title = titleInput.current?.value as string
        const description = descriptionInput.current?.value as string
        const activityType = activityInput.current?.value as ActivityType
        const startDate = new Date(hourInput.current?.value as string)
        const startHour = startDate.getHours() + ':' + startDate.getMinutes()

        if (title && description && activityType && startHour) {
            activitiesCtxt.addActivity(title, description, startHour, activityType)
            setToastMsg('The activity has been saved')
            history.push('/all-activities')
        }
    };

    return (
        <React.Fragment>
            <IonToast isOpen={!!toastMsg}
                message={toastMsg}
                duration={4000}
                color="medium"
                onDidDismiss={() => setToastMsg('')} />

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Add activity</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonSegment ref={activityInput}>
                                    <IonSegmentButton value="work">
                                        <IonLabel>Work</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="rest">
                                        <IonLabel>Rest</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="hobby">
                                        <IonLabel>Hobby</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Activity title</IonLabel>
                                    <IonInput ref={titleInput} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Activity description</IonLabel>
                                    <IonInput ref={descriptionInput} type="text"></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Starting hour</IonLabel>
                                    <IonDatetime
                                        ref={hourInput}
                                        value={new Date().toISOString()}
                                        presentation="time" />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-center ion-margin-top">
                                <IonButton onClick={addActivity} expand="block" fill="outline">Add Activity</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AddActivity;
