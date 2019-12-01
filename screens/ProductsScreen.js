import React from 'react';
import {Button} from 'react-native';

class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };

  constructor(props) {
    super(props);

    this.getRole = this.getRole.bind(this);

    this.accessToken = this.props.navigation.getParam('accessToken', null);
    console.debug(this.accessToken);

    this.getRole();
  }
  render() {
    return <Button title="Add new product" />;
  }

  getRole() {
    console.debug('getRole');
  }
}

export default ProductsScreen;
