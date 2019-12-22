import React from 'react';
import {Text, View} from 'react-native';

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

    this.getProducts();
  }
  render() {
    if (this.state.isLoading) {
      return <Text>Loading</Text>;
    }

    return (
      <View>
        {this.state.data.map(item => (
          <Text key={item.id}>{item.modelName}</Text>
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
}

export default HomeScreen;
