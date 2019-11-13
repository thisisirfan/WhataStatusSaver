import React, {Component} from 'react';
import {StatusBar, Alert} from 'react-native';
import {createAppContainer} from 'react-navigation';
import StackNavigator from './navigation/StackNavigator';
import firebase from 'react-native-firebase';
const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    this.checkFcmPermission();
    this.createNotificationListeners();
    /* this.messageListener = firebase.messaging().onMessage(message => {
      console.log('push notification arrived', message);
    }); */

    /* this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        console.log('on token refresh', fcmToken);
      }); */
  }

  componentWillUnmount() {
    this.messageListener();
    /* this.onTokenRefreshListener(); */
  }

  async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    console.log('FCM Token', fcmToken);
  }

  async checkFcmPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      console.log('FCM Permission already enabled');
    } else {
      this.requestFcmPermission();
      // user doesn't have permission
    }
  }

  async requestFcmPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      console.log('Error on request perm', error);
      // User has rejected permissions
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        console.log('onNotification:', notification);
        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
          .setSound('sampleaudio.wav')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error('error in notif:', err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_FirebaseNotifiction_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Demo app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        console.log('onNotificationOpened:');
        Alert.alert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      console.log('getInitialNotification:::', notificationOpen);
      //Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <AppContainer />
      </>
    );
  }
}
