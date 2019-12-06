import React from 'react';
import {StatusBar, BackHandler} from 'react-native';
import {createAppContainer} from 'react-navigation';
import StackNavigator from './navigation/StackNavigator';
import ExitAppModal from './components/ExitAppModal';

const AppContainer = createAppContainer(StackNavigator);

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.setModalVisible(true);
    return true;
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ExitAppModal
          modalVisible={this.state.modalVisible}
          exitModal={this.setModalVisible}
        />
        <AppContainer />
      </>
    );
  }
}

export default App;
