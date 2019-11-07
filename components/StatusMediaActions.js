import React, {Component} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SingleStatusView} from './SingleStatusView';
import ImageView from 'react-native-image-view';
import Video from 'react-native-video';
var RNFS = require('react-native-fs');
import Global from './../Global';
const statusDirPath = Global.downloadFolderPath;
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');

export class StatusMediaActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isVideo: true,
      imagePath: [],
    };
  }

  _ViewMedia = (visible, mediaUri) => {
    console.log('is video', this.isVideoMedia(mediaUri));
    this.setState({
      isVisible: visible,
      isVideo: this.isVideoMedia(mediaUri),
      imagePath: [
        {
          source: {
            uri: 'file://' + mediaUri,
          },
          width: 1000,
          height: 1000,
        },
      ],
    });
    /* setTimeout(() => {
      console.log('updated image', this.state.imagePath);
    }, 500); */
  };

  isVideoMedia(uri) {
    return uri.endsWith('.mp4');
  }

  _DownloadMedia = async () => {
    this.createStatusDirectory();
    console.log(this.props.media);
    let sourcePath = this.props.media.path;
    let destinationPath = statusDirPath + '/' + this.props.media.name;
    //console.table([sourcePath, destinationPath]);
    setTimeout(() => {
      RNFS.copyFile(sourcePath, destinationPath)
        .then(result => {
          ToastAndroid.show(
            'Status has been successfully saved in `WhataStatuses` folder!',
            ToastAndroid.LONG,
          );
          console.log('file copied:', result);
        })
        .catch(err => {
          console.log('Error while copying:');
          console.log(err);
        });
    }, 1000);
  };

  async createStatusDirectory() {
    let granted = await this.requestStoragePermission();
    if (granted) {
      RNFS.mkdir(statusDirPath)
        .then(result => {
          //console.log('Dir created:', result);
        })
        .catch(err => {
          console.log('error: ', err.message, err.code);
        });
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('You can use the storage');
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

  _ShareMedia() {
    console.log('shared media');
  }

  _SingleViewStatus() {
    return (
      <View>
        {this.state.isVisible ? (
          this.state.isVideo ? (
            <Modal
              onRequestClose={() => {
                this.setState({
                  isVisible: false,
                });
              }}>
              <Video
                source={{uri: this.state.imagePath[0].source.uri}}
                ref={ref => {
                  this.player = ref;
                }}
                /* paused={this.state.isVideo && this.state.isVisible} */
                controls={true}
                resizeMode={'contain'}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                style={styles.backgroundVideo}
              />
            </Modal>
          ) : (
            <ImageView
              images={this.state.imagePath}
              imageIndex={0}
              isPinchZoomEnabled={false}
              onClose={() => {
                this.setState({isVisible: false});
              }}
            />
          )
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View>
        {/* <SingleStatusView
          path={this.props.media.path}
          isVisible={this.state.isVisible}
        /> */}
        {this._SingleViewStatus()}
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => this._ViewMedia(true, this.props.media.path)}
            style={styles.actionBtn}>
            <Icon
              name="play"
              style={[styles.actionBtnIcon, {color: '#455A64'}]}
            />
          </TouchableOpacity>
          {this.props.showDownload ? (
            <TouchableOpacity
              onPress={() => this._DownloadMedia()}
              style={styles.actionBtn}>
              <Icon
                name="download"
                style={[styles.actionBtnIcon, {color: '#66D367'}]}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => this.shareImage(this.props.media.path)}
            style={styles.actionBtn}>
            <Icon
              name="share"
              style={[styles.actionBtnIcon, {color: '#03A9F4'}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  shareImage(fileUri) {
    RNFS.readFile(fileUri, 'base64').then(image => {
      Share.open({
        url: 'data:image/jpeg;base64,' + image,
        type: 'image/jpeg',
      }).catch(err => {
        console.log(err);
      });
    });
  }
}

const styles = StyleSheet.create({
  actionWrapper: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  actionBtn: {
    width: 20,
    height: 20,
    fontSize: 20,
    marginHorizontal: 20,
  },
  actionBtnIcon: {
    fontSize: 20,
  },
  backgroundVideo: {
    /* flex: 1,
    position: 'absolute', */
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    height: height,
    width: width,
  },
});
