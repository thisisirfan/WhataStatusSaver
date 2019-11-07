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
import GLOBAL from './../Global';

//ad config
const interstitialUnitId = GLOBAL.AD_IDS.INTERSTITIAL_ID;
const AdRequest = firebase.admob.AdRequest;

//load interstatial ad
const InterAdvert = firebase.admob().interstitial(interstitialUnitId);
const InterRequest = new AdRequest();

export class WhatsappStatusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: [],
      currentStatus: '',
    };
  }

  componentDidMount() {
    this.getStatuses();
    this.loadInterstatialAd();
  }

  loadInterstatialAd() {
    InterAdvert.loadAd(InterRequest.build());
    InterAdvert.on('onAdLoaded', () => {
      InterAdvert.show();
    });
  }

  getStatuses = async () => {
    let granted = await this.requestStoragePermission();
    if (granted) {
      let whatsappFileUri = '/storage/emulated/0/WhatsApp/Media/.Statuses';
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
    }
  };

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Whata Status Access',
          message: 'Whata status required storage access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
        return true;
        //this.getDirectoryPerm();
      } else {
        console.log('Storage permission denied');
        return false;
      }
    } catch (err) {
      return false;
    }
  }

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
                    showDownload={true}
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
        {this.showStatuses()}
        {this.noStatusAvailable()}
      </ScrollView>
    );
  }
}

WhatsappStatusScreen.navigationOptions = {
  title: 'Statuses',
};

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
