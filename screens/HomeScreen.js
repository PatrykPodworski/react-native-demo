import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import Product from '../components/Product';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      offline: true,
      data: [],
    };
    this.getProducts = this.getProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.synchronizeData = this.synchronizeData.bind(this);

    this.refreshData();
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return <Text>Loading</Text>;
    }

    return (
      <View>
        <Button
          title={this.state.offline ? 'Offline' : 'Online'}
          onPress={this.toggleMode}
        />
        <Button
          title="Add new product"
          onPress={() => navigate('Product', {offline: this.state.offline})}
        />
        <Button title="Refresh" onPress={this.refreshData} />
        <Text>Manufacturer Model name Price Quantity</Text>
        {this.state.data
          .filter(item => item.status !== 'deleted')
          .map((item, index) => (
            <Product
              key={index}
              item={item}
              update={this.updateProduct}
              navigation={this.props.navigation}
              offline={this.state.offline}
            />
          ))}
      </View>
    );
  }

  getProducts() {
    this.setState({isLoading: true});
    fetch('http://10.0.75.1/api/products')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({data: resp, isLoading: false});
        AsyncStorage.setItem('products', JSON.stringify(resp));
      });
  }

  loadProducts() {
    AsyncStorage.getItem('products').then(value => {
      this.setState({data: JSON.parse(value), isLoading: false});
    });
  }

  refreshData() {
    if (this.state.offline) {
      this.loadProducts();
      return;
    }
    this.getProducts();
  }

  toggleMode() {
    if (!this.state.offline) {
      AsyncStorage.setItem('products', JSON.stringify(this.state.data));
    } else {
      this.synchronizeData();
    }

    this.setState(prevState => ({
      offline: !prevState.offline,
    }));
  }
  updateProduct(item) {
    console.log(item);
    var data = this.state.data;
    var oldItem = data.filter(x => x.id === item.id)[0];
    if (item.status === 'delete') {
      delete data[data.indexOf(oldItem)];
    } else {
      data[data.indexOf(oldItem)] = item;
    }

    this.setState({data: data});
    if (this.state.offline) {
      AsyncStorage.setItem('products', JSON.stringify(this.state.data));
    }
  }

  synchronizeData() {
    var items = this.state.data.filter(
      x => x.status != null || x.delta != null,
    );
    if (items.length === 0) {
      return;
    }
    fetch('http://10.0.75.1/api/products/synchronize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    })
      .then(resp => {
        this.refreshData();
      })
      .catch(err => console.log(err));
  }
}

export default HomeScreen;
