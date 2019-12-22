import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.incrementProduct = this.incrementProduct.bind(this);
  }
  render() {
    var item = this.props.item;
    return (
      <View style={styles.row} key={item.id}>
        <Text>
          {item.manufacturer} {item.modelName} {item.price} {item.quantity}
        </Text>
        <View style={styles.buttons}>
          <Button title="+" onPress={this.incrementProduct} />
          <Button title="-" />
          <Button title="Edit" />
          <Button title="Delete" />
        </View>
      </View>
    );
  }

  incrementProduct() {
    var item = this.props.item;
    fetch(`http://192.168.0.54/api/products/${item.id}?value=1`, {
      method: 'POST',
    })
      .then(() => {
        item.quantity++;
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
