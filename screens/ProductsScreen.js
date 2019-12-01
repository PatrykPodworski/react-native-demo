import React from 'react';
import {Button} from 'react-native';

class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };
  render() {
    return <Button title="Add new product" />;
  }
}

export default ProductsScreen;
