import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import ImageView from 'react-native-image-view';
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');

export class SingleStatusView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: [
        {
          source: {
            uri: this.props.path,
          },
        },
      ],
    };

    if (this.props.isVisible) {
      this.updateImgPath();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* console.log('prev props' + this.props.path, prevProps);
    if (prevProps.path !== this.props.path) {
      setTimeout(() => {
        console.log('show image', this.state.imagePath);
      }, 500);
    } */
  }

  updateImgPath() {
    console.log('file://' + this.props.path);
    this.setState({
      imagePath: [
        {
          source: {
            uri: 'file://' + this.props.path,
          },
        },
      ],
    });
  }

  closeImageView() {
    this.props.isVisible = false;
  }

  render() {
    return (
      <View>
        {this.props.isVisible ? (
          <>
            <Text>Testing</Text>
            <ImageView
              images={this.state.imagePath}
              imageIndex={0}
              isVisible={true}
              onClose={() => this.closeImageView()}
            />
          </>
        ) : null}
      </View>
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
});
