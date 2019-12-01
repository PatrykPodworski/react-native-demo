import React from 'react';
import OAuthManager from 'react-native-oauth';
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
    // const manager = new OAuthManager(configuration.client_id);
    // manager.addProvider({
    //   Warehouse: {
    //     auth_version: '2.0',
    //     authorize_url:
    //   },
    // });
    console.debug(JSON.stringify(configuration));
    console.debug('end loginUsingLocalServer');
  }

  async loginUsingGoogle() {
    console.debug('start loginUsingGoogle');
    const manager = new OAuthManager('firestackexample');
    manager.configure({
      google: {
        callback_url: 'http://vps760053.ovh.net/signin-google',
        client_id:
          '194185593540-hso4a6nkhqbog0ptu34ffj0cdpqfn2i0.apps.googleusercontent.com',
        client_secret: 'Nk0Uq1mkQY_oanzKBqBCI08e',
        rawScopes: 'true',
      },
    });

    manager
      .authorize('google', {scopes: 'profile'})
      .then(resp => {
        console.debug(JSON.stringify(resp));
        this.props.navigation.navigate('Products', {token: resp.token});
      })
      .catch(err => console.debug(err));
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
