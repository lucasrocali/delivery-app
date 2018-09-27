import React from 'react';
import { StyleSheet, Platform, Image, Icon, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions, DrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Ionicon from "react-native-vector-icons/Ionicons";

import colors from '../constants/colors';

import BaseScreen from '../screens/BaseScreen';
import LaunchScreen from '../screens/LaunchScreen';
import SocialLoginScreen from '../screens/SocialLoginScreen';
import LoginScreen from '../screens/LoginScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

import { } from '../screens/styled'
// import { FluidNavigator } from 'react-navigation-fluid-transitions'

const icon_names = {
    left_back: 'ios-arrow-back',
    close: 'ios-arrow-down',
    person: 'ios-person',
    cart: 'ios-cart'
}

const ButtonIcon = (props: Props) => {
    const { onPress, icon_name } = props
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}
            onPress={onPress}>
            <Ionicon
                name={icon_name}
                size={25}
                color={colors.link}
                backgroundColor={"transparent"}
            />
        </TouchableOpacity>
    );
}

//title, backBtn = true, routeName = null
const baseNavigationOption = (navigation, options: { title: string, leftIcon: boolean, leftRouteName: string, rightIcon: boolean, rightRouteName: string }) => ({
    title: navigation.state.params && navigation.state.params.title ? navigation.state.params.title : options.title,
    gesturesEnabled: false,
    headerTintColor: colors.link,
    tintColor: colors.link,
    headerStyle: {
        backgroundColor: colors.white,
        elevation: null,
    },
    headerLeft: options.leftIcon && (
        <ButtonIcon
            icon_name={options.leftIcon}
            onPress={() => options.leftRouteName ? navigation.navigate({ routeName: options.leftRouteName }) : navigation.goBack(null)}
        />
    ),
    headerRight: options.rightIcon && (
        <ButtonIcon
            icon_name={options.rightIcon}
            onPress={() => options.rightRouteName ? navigation.navigate({ routeName: options.rightRouteName }) : navigation.goBack(null)}
        />
    )
})

const CategoriesStack = StackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Categorias",
                leftIcon: icon_names.person,
                leftRouteName: 'SocialLogin',
                rightIcon: icon_names.cart,
                rightRouteName: 'Cart'
            }),
        }
    }
)


const StoreStack = StackNavigator(
    {
        Store: {
            screen: StoreScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Loja",
            }),
        }
    }
)

// const CategoriesNavigator = StackNavigator(
//     {
//         Categories: {
//             screen: CategoriesStack,
//         },
//         Store: {
//             screen: StoreScreen,
//             navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
//                 title: "Loja",
//             }),
//         },
//     }, {
//         mode: 'modal',
//         initialRouteName: "Categories",
//         navigationOptions: {
//             header: null,
//         },
//     }
// );
// const CategoriesStack = StackNavigator(
//     {
//         Categories: {
//             screen: CategoriesScreen,
//             navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Categorias", false),
//         },
//         Store: {
//             screen: StoreScreen,
//             navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Loja"),
//         },
//     }, {
//         initialRouteName: "Categories"
//     }
// );

const CartStack = StackNavigator(
    {
        Cart: {
            screen: CartScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Loja",
            }),
        }
    }
);

const ProductStack = StackNavigator(
    {
        Product: {
            screen: ProductScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Produto",
            }),
        }
    }
);

const LoginStack = StackNavigator(
    {
        SocialLogin: {
            screen: SocialLoginScreen,
            navigationOptions: {
                header: null,
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Fazer Login",
                leftIcon: icon_names.left_back,
            }),
        }
    },
);

export const MainStack = createMaterialTopTabNavigator(
    {
        PerfilStack: {
            screen: BaseScreen
        },
        CategoriesStack: {
            screen: CategoriesStack
        },
        CartStack: {
            screen: CartStack
        }
    }, {
        initialRouteName: "CategoriesStack",
        navigationOptions: {
            gesturesEnabled: true,
            tabBarVisible: false,
        }
    }
)

export const AppNavigator = StackNavigator(
    {
        Launch: {
            screen: LaunchScreen
        },
        Main: {
            screen: MainStack
        },
        Product: {
            screen: ProductStack
        },
        Store: {
            screen: StoreScreen
        },
        Login: {
            screen: LoginStack
        }
    }, {
        initialRouteName: "Launch",
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);