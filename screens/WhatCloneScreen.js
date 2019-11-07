import React from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');
import firebase from 'react-native-firebase';
import GLOBAL from './../Global';

//ad config
const interstitialUnitId = GLOBAL.AD_IDS.INTERSTITIAL_ID;
const AdRequest = firebase.admob.AdRequest;

//load interstatial ad
const InterAdvert = firebase.admob().interstitial(interstitialUnitId);
const InterRequest = new AdRequest();

export class WhatCloneScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://web.whatsapp.com/',
    };
  }

  componentDidMount() {
    this.loadInterstatialAd();
  }

  loadInterstatialAd() {
    InterAdvert.loadAd(InterRequest.build());
    InterAdvert.on('onAdLoaded', () => {
      InterAdvert.show();
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <WebView
          userAgent={
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
          }
          ref={myWeb => (this.refWeb = myWeb)}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'https://web.whatsapp.com/'}}
          bounces={true}
          style={styles.webviewStyle}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled={true}
          onError={err => {
            console.log('ERROR', err);
          }}
        />
      </ScrollView>
    );
  }
}

WhatCloneScreen.navigationOptions = {
  title: 'Whatsapp',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewStyle: {
    flex: 1,
    width: width,
    height: height,
  },
});
