import { CreateStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import LoginApp from '../screens/login'
import RegisterApp from '../screens/register'

const screens = {
    Default: {
        screen: LoginApp
    },
    Register: {
        screen: RegisterApp
    }
}

const HomeStack = CreateStackNavigator(screens);

export default createAppContainer(HomeStack);