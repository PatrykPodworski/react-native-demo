import React from 'react';
import {Button} from 'react-native';

class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
    this.getProducts = this.getProducts.bind(this);

    this.getProducts();
  }
  render() {
    if (this.state.isLoading) {
      return <p>Loading</p>;
    }

    return (
      <ul>
        {this.state.data.map(item => (
          <li key={item.id}>item.modelName</li>
        ))}
      </ul>
    );
  }

  getProducts() {
    fetch('http://192.168.0.54/api/products').then(resp => {
      console.log(this.state.data);
      this.setState({data: resp, isLoading: false});
    });
  }
}

export default ProductsScreen;
