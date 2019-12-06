import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {StatusMediaActions} from '../components/StatusMediaActions';
var RNFS = require('react-native-fs');
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');
import firebase from 'react-native-firebase';
import GLOBAL from '../Global';
const downloadDirPath = GLOBAL.downloadFolderPath;

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

export class WhatDownloadsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      currentStatus: '',
    };
  }

  componentDidMount() {
    this.getStatuses();
    //this.loadInterstatialAd();
  }

  loadInterstatialAd() {
    InterAdvert.loadAd(InterRequest.build());
    InterAdvert.on('onAdLoaded', () => {
      InterAdvert.show();
    });
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

  getStatuses = async () => {
    let whatsappFileUri = downloadDirPath;
    RNFS.readDir(whatsappFileUri)
      .then(result => {
        //console.log('GOT RESULT:', result);
        this.setState({
          statuses: result,
        });
      })
      .catch(err => {
        console.log('error: ', err.message, err.code);
      });
  };

  _ViewStatus(status) {
    console.log(status);
    this.setState({
      currentStatus: status.path,
    });
  }

  mediaSize(size) {
    let _size = Math.round(size / 1024);
    if (_size < 1024) {
      _size = _size + ' KB';
    } else {
      _size = Math.fround(_size / 1024) + 'MB';
    }
    return <Text style={styles.mediaSize}>{_size}</Text>;
  }

  showStatuses() {
    return (
      <View style={styles.statusesWrapper}>
        {this.state.statuses.map(
          function(item, index) {
            if (item.name !== '.nomedia') {
              return (
                <View style={styles.statusCol} key={index + 1}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => this._ViewStatus(item)}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: 'file://' + item.path,
                      }}
                      style={styles.statusImage}
                    />
                  </TouchableOpacity>
                  <StatusMediaActions
                    currentStatus={this.state.currentStatus}
                    media={item}
                    showDownload={false}
                  />
                </View>
              );
            }
          }.bind(this),
        )}
      </View>
    );
  }

  noStatusAvailable() {
    return (
      <View>
        <Text style={styles.noAvailStatus}>
          Please visit the status in Whatsapp once and you will see downloadable
          status here
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.showBannerAd()}
        {this.showStatuses()}
        {this.noStatusAvailable()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  statusesWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusCol: {
    width: '50%',
    padding: 5,
  },
  statusImage: {
    height: height / 4,
    width: width / 2 - 10,
  },
  mediaSize: {
    textAlign: 'center',
  },
  noAvailStatus: {
    textAlign: 'center',
    padding: 15,
    color: '#ccc',
    fontSize: 16,
  },
});
