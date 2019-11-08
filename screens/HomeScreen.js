import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import GLOBAL from './../Global';
import RateApp from '../components/RateApp';
//ad config
const interstitialUnitId = GLOBAL.AD_IDS.INTERSTITIAL_ID;
const AdRequest = firebase.admob.AdRequest;

//load interstatial ad
const InterAdvert = firebase.admob().interstitial(interstitialUnitId);
const InterRequest = new AdRequest();

//load banner
const bannerUnitId = GLOBAL.AD_IDS.BANNER_ID;
const Banner = firebase.admob.Banner;
const bannerRequest = new AdRequest();

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    //load interstatial ad
    this.loadInterstatialAd();
  }

  goToScreen(screen) {
    this.props.navigation.push(screen);
  }

  loadInterstatialAd() {
    InterAdvert.loadAd(InterRequest.build());
    InterAdvert.on('onAdLoaded', () => {
      InterAdvert.show();
    });
  }

  screenBg() {
    return (
      <Image
        source={require('./../assets/images/bg.jpg')}
        style={styles.backgroundImage}
      />
    );
  }

  showBannerAd() {
    return (
      <Banner
        style={styles.bannerStyling}
        unitId={bannerUnitId}
        size={'SMART_BANNER'}
        request={bannerRequest.build()}
        onAdLoaded={() => {
          //console.log('Advert banner loaded');
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Whata Status & Cloner</Text>
        <TouchableOpacity
          style={[styles.menuBtn, {backgroundColor: 'rgb(37, 211, 102)'}]}
          onPress={() => {
            this.goToScreen('WhatStatus');
          }}>
          <Icon name="whatsapp" style={styles.menuBtnIcon} />
          <Text style={styles.menuBtnText}>Status Downloader</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuBtn, {backgroundColor: '#128c7e'}]}
          onPress={() => {
            this.goToScreen('WhatClone');
          }}>
          <Icon
            name="whatsapp"
            style={[
              styles.menuBtnIcon,
              {left: 2, transform: [{rotateY: '180deg'}]},
            ]}
          />
          <Icon name="whatsapp" style={styles.menuBtnIcon} />
          <Text style={styles.menuBtnText}>Whatsapp Cloner</Text>
        </TouchableOpacity>
        <RateApp />
        {this.showBannerAd()}
        {this.screenBg()}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 15,
    width: 230,
    backgroundColor: '#eee',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
    borderRadius: 4,
  },
  menuBtnIcon: {
    color: '#fff',
    fontSize: 20,
    width: 25,
    position: 'absolute',
    top: 18,
    left: 30,
  },
  menuBtnText: {
    color: '#fff',
    fontSize: 18,
    position: 'relative',
    left: 40,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    resizeMode: 'contain', // or 'stretch'
  },
  titleStyle: {
    fontSize: 24,
    fontFamily: 'sans-serif-light',
    color: '#ffffff',
    marginBottom: 20,
  },
  bannerStyling: {position: 'absolute', bottom: 0},
});
