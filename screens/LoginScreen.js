import React from 'react';
import {Button, View} from 'react-native';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.loginUsingLocalServer = this.loginUsingLocalServer.bind(this);
  }
  static navigationOptions = {
    title: 'Login Screen',
  };

  async loginUsingLocalServer() {
    console.debug('start loginUsingLocalServer');
    const response = await fetch(
      'http://vps760053.ovh.net/_configuration/Warehouse2',
    );
    const configuration = await response.json();
    console.debug(JSON.stringify(configuration));
    console.debug('end loginUsingLocalServer');
  }

  async loginUsingGoogle() {
    console.debug('start loginUsingGoogle');
    console.debug('end loginUsingGoogle');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button title="Local login" onPress={this.loginUsingLocalServer} />
        <Button title="Google login" onPress={this.loginUsingGoogle} />
        <Button title="Go to home screen" onPress={() => navigate('Home')} />
      </View>
    );
  }
}

export default LoginScreen;
