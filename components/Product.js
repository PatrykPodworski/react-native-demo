import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {getUniqueId} from 'react-native-device-info';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }
  render() {
    const {navigate} = this.props.navigation;
    var item = this.props.item;
    return (
      <View style={styles.row} key={item.id}>
        <Text>
          {item.manufacturer} {item.modelName} {item.price} {item.quantity}{' '}
          {item.color}
        </Text>
        <View style={styles.buttons}>
          <Button title="+" onPress={this.incrementProduct} />
          <Button title="-" onPress={this.decrementProduct} />
          <Button
            title="Edit"
            onPress={() =>
              navigate('Product', {item: item, offline: this.props.offline})
            }
          />
          <Button title="Delete" onPress={this.deleteProduct} />
        </View>
      </View>
    );
  }

  incrementProduct() {
    this.changeQuantity(1);
  }

  changeQuantity(value) {
    var item = this.props.item;
    item.localSum = item.localSum + value || value;
    if (this.props.offline) {
      item.quantity += value;
      this.props.update(item);
    } else {
      var deviceid = getUniqueId();
      fetch(`http://10.0.75.1/api/products/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: value, deviceId: deviceid}),
      })
        .then(() => {
          item.quantity += value;
          item.localSum = item.localSum + value || value;
          this.props.update(item);
        })
        .catch(err => console.log(err));
    }
  }

  decrementProduct() {
    this.changeQuantity(-1);
  }

  deleteProduct() {
    var item = this.props.item;
    if (this.props.offline) {
      item.status = 'deleted';
      this.props.update(item);
    } else {
      fetch(`http://10.0.75.1/api/products/${item.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          item.status = 'delete';
          this.props.update(item);
        })
        .catch(err => console.log(err));
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Product;
