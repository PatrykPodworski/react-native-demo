import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var item = this.props.item;
    return (
      <View style={styles.row} key={item.id}>
        <Text>
          {item.manufacturer} {item.modelName} {item.price} {item.quantity}
        </Text>
        <View style={styles.buttons}>
          <Button title="+" />
          <Button title="-" />
          <Button title="Edit" />
          <Button title="Delete" />
        </View>
      </View>
    );
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
