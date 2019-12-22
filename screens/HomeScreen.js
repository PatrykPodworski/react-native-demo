import React from 'react';
import {Text, View, Button} from 'react-native';
import Product from '../components/Product';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
    this.getProducts = this.getProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    this.getProducts();
  }
  render() {
    if (this.state.isLoading) {
      return <Text>Loading</Text>;
    }

    return (
      <View>
        <Button title="Add new product" />
        <Text>Manufacturer Model name Price Quantity</Text>
        {this.state.data.map(item => (
          <Product item={item} update={this.updateProduct} />
        ))}
      </View>
    );
  }

  getProducts() {
    fetch('http://192.168.0.54/api/products')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({data: resp, isLoading: false});
        console.log(this.state.data);
      })
      .catch(err => console.log(err));
  }

  updateProduct(item) {
    var data = this.state.data;
    var oldItem = data.filter(x => x.id === item.id)[0];
    data[data.indexOf(oldItem)] = item;
    this.setState({data: data});
  }
}

export default HomeScreen;
