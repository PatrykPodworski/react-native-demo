import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import Product from '../components/Product';

class Warehouse extends React.Component {
  constructor(props) {
    super(props);
    this.updateProduct = this.updateProduct.bind(this);
  }

  render() {
    return (
      <View key={this.props.warehouse.warehouseId}>
        <Text style={styles.title}>{this.props.warehouse.warehouseName}</Text>
        {this.props.warehouse.products
          .filter(item => item.status !== 'deleted')
          .map((item, index) => (
            <Product
              key={index}
              item={item}
              update={this.updateProduct}
              navigation={this.props.navigation}
              offline={this.props.offline}
            />
          ))}
      </View>
    );
  }

  updateProduct(item) {
    this.props.update(item, this.props.warehouse.warehouseId);
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Warehouse;
