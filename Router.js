import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import PlanetDetail from './src/Screens/PlanetDetail';

export const appNavigationOptions = createStackNavigator({
    Login:{
        screen:Login
    },
    Home:{
        screen:Home
    },PlanetDetail:{
        screen:PlanetDetail
    }
},
{
    headerMode:'none'
})
export const AppContainer = createAppContainer(appNavigationOptions);
