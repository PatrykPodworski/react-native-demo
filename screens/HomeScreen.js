import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import Warehouse from '../components/Warehouse';
import {getUniqueId} from 'react-native-device-info';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      offline: false,
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
        {this.state.data.map(warehouse => (
          <Warehouse
            warehouse={warehouse}
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
    fetch(`http://10.0.75.1/api/products/warehouses?deviceId=${getUniqueId()}`)
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
  updateProduct(item, warehouseId) {
    var state = this.state.data;
    var products = state.find(x => x.warehouseId === warehouseId).products;
    var oldItem = products.filter(x => x.id === item.id)[0];
    if (item.status === 'delete') {
      delete products[products.indexOf(oldItem)];
    } else {
      products[products.indexOf(oldItem)] = item;
    }

    this.setState({data: state});
    if (this.state.offline) {
      AsyncStorage.setItem('products', JSON.stringify(this.state.data));
    }
  }

  synchronizeData() {
    var items = this.state.data.map(x => x.products).flat();
    console.log(items);
    if (items.length === 0) {
      return;
    }
    fetch(`http://10.0.75.1/api/products/synchronize/${getUniqueId()}`, {
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
