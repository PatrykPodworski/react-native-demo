import React from 'react';
import {WebView} from 'react-native-webview';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <WebView
        source={{uri: 'http://vps760053.ovh.net/Identity/Account/Login'}}
        userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
      />
    );
  }
}

export default HomeScreen;
