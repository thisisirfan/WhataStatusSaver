import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RateApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{padding: 25}}
          onPress={() => {
            const options = {
              GooglePackageName: 'com.centcom.qr.ultimateStatusSaver',
              preferredAndroidMarket: AndroidMarket.Google,
              preferInApp: false,
              openAppStoreIfInAppFails: true,
              fallbackPlatformURL: 'https://play.google.com/',
            };
            Rate.rate(options, success => {
              if (success) {
                this.setState({rated: true});
              }
            });
          }}>
          <Text style={{color: 'gold', fontSize: 16}}>
            <Icon name="star" style={{fontSize: 16}} /> Rate App
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
