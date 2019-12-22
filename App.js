import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Product: {screen: ProductScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
