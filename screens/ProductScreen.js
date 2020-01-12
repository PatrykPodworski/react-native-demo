import React from 'react';
import {View, Text, Button, TextInput, AsyncStorage} from 'react-native';

class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Product',
  };
  constructor(props) {
    super(props);

    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeModelName = this.onChangeModelName.bind(this);
    this.onchangePrice = this.onchangePrice.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);

    var item = this.props.navigation.getParam('item', null);
    var offline = this.props.navigation.getParam('offline', false);
    if (item != null) {
      this.state = {
        id: item.id,
        manufacturer: item.manufacturer,
        modelName: item.modelName,
        price: item.price,
        offline: offline,
      };
    } else {
      this.state = {
        manufacturer: '',
        modelName: '',
        price: 0,
        offline: offline,
      };
    }
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
    var value = parseFloat(text) || 0;
    this.setState({price: value});
  }

  saveProduct() {
    if (this.state.id != null) {
      this.editProduct();
      return;
    }
    this.createProduct();
  }

  createProduct() {
    const {navigate} = this.props.navigation;
    var item = this.state;
    if (this.state.offline) {
      AsyncStorage.getItem('products').then(value => {
        var data = JSON.parse(value);
        item.id =
          Math.max(...data.map(x => x.id).filter(x => Number.isInteger(x))) + 1;
        item.status = 'created';
        item.quantity = 0;
        data.push(item);
        AsyncStorage.setItem('products', JSON.stringify(data));
        navigate('Home', {isRefreshRequired: true});
      });
    } else {
      fetch('http://10.0.75.1/api/products', {
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

  editProduct() {
    const {navigate} = this.props.navigation;
    var item = this.state;
    if (this.state.offline) {
      AsyncStorage.getItem('products').then(value => {
        var data = JSON.parse(value);
        var oldItem = data.filter(x => x.id === item.id)[0];
        item.status = 'edited';
        item.quantity = oldItem.quantity;
        item.delta = oldItem.delta;
        data[data.indexOf(oldItem)] = item;
        AsyncStorage.setItem('products', JSON.stringify(data));
        navigate('Home', {isRefreshRequired: true});
      });
    } else {
      fetch(`http://10.0.75.1/api/products/${item.id}`, {
        method: 'PUT',
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
}

export default ProductsScreen;
