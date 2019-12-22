import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';

class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Product',
  };

  constructor(props) {
    super(props);
    this.state = {
      manufacturer: '',
      modelName: '',
      price: 0,
    };

    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeModelName = this.onChangeModelName.bind(this);
    this.onchangePrice = this.onchangePrice.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Manufacturer</Text>
        <TextInput
          value={this.state.manufacturer}
          onChangeText={text => this.onChangeManufacturer(text)}
        />
        <Text>Model name</Text>
        <TextInput
          value={this.state.modelName}
          onChangeText={text => this.onChangeModelName(text)}
        />
        <Text>Price</Text>
        <TextInput
          value={this.state.price.toString()}
          onChangeText={text => this.onchangePrice(text)}
        />
        <Button title="Save" onPress={this.saveProduct} />
        <Button title="Cancel" onPress={() => navigate('Home')} />
      </View>
    );
  }

  onChangeManufacturer(text) {
    this.setState({manufacturer: text});
  }
  onChangeModelName(text) {
    this.setState({modelName: text});
  }
  onchangePrice(text) {
    var value = parseFloat(text);
    this.setState({price: value});
  }

  saveProduct() {
    const {navigate} = this.props.navigation;
    var item = this.state;

    fetch('http://192.168.0.54/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(resp => {
        navigate('Home', {isRefreshRequired: true});
      })
      .catch(err => console.log(err));
  }
}

export default ProductsScreen;
