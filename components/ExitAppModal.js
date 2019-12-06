import React, {Component} from 'react';
import {
  StyleSheet,
  BackHandler,
  Modal,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import firebase from 'react-native-firebase';
import GLOBAL from './../Global';

const AdRequest = firebase.admob.AdRequest;

//load banner
const bannerUnitId = GLOBAL.AD_IDS.BANNER_ID;
const Banner = firebase.admob.Banner;
const bannerRequest = new AdRequest();

export default class ExitAppModal extends Component {
  constructor(props) {
    super(props);
  }

  setModalVisible(visible) {
    this.props.exitModal(visible);
  }

  showBannerAd() {
    return (
      <Banner
        style={styles.bannerStyle}
        unitId={bannerUnitId}
        size={'smartBannerLandscape'}
        request={bannerRequest.build()}
      />
    );
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={styles.container}>
            <View>
              <Text style={styles.textStyle}>Exit From App</Text>
              <Text style={styles.textStyle}>
                Do you want to exit From App ?
              </Text>
              {this.showBannerAd()}
              <View style={styles.actionBtnsWrapper}>
                <TouchableHighlight
                  style={[styles.actionBtns, {backgroundColor: '#888'}]}
                  onPress={() => {
                    BackHandler.exitApp();
                  }}>
                  <Text style={styles.actionBtnText}>Yes</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.actionBtns}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text style={styles.actionBtnText}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    padding: 10,
    left: 0,
    right: 0,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  bannerStyle: {
    marginVertical: 15,
    alignSelf: 'center',
  },
  actionBtnsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  actionBtns: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    maxWidth: 120,
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
  },
  actionBtnText: {
    fontSize: 16,
  },
});
