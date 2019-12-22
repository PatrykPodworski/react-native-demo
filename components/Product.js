import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  render() {
    const {navigate} = this.props.navigation;
    var item = this.props.item;
    return (
      <View style={styles.row} key={item.id}>
        <Text>
          {item.manufacturer} {item.modelName} {item.price} {item.quantity}
        </Text>
        <View style={styles.buttons}>
          <Button title="+" onPress={this.incrementProduct} />
          <Button title="-" onPress={this.decrementProduct} />
          <Button
            title="Edit"
            onPress={() => navigate('Product', {item: item})}
          />
          <Button title="Delete" onPress={this.deleteProduct} />
        </View>
      </View>
    );
  }

  incrementProduct() {
    var item = this.props.item;
    fetch(`http://10.0.75.1/api/products/${item.id}?value=1`, {
      method: 'POST',
    })
      .then(() => {
        item.quantity++;
        this.props.update(item);
      })
      .catch(err => console.log(err));
  }

  decrementProduct() {
    var item = this.props.item;
    fetch(`http://10.0.75.1/api/products/${item.id}?value=-1`, {
      method: 'POST',
    })
      .then(() => {
        item.quantity--;
        this.props.update(item);
      })
      .catch(err => console.log(err));
  }

  deleteProduct() {
    var item = this.props.item;
    fetch(`http://10.0.75.1/api/products/${item.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        item.status = 'deleted';
        this.props.update(item);
      })
      .catch(err => console.log(err));
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
