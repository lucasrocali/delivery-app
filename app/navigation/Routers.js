import React from 'react';
import { StyleSheet, Platform, Image, Icon, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions, DrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Ionicon from "react-native-vector-icons/Ionicons";

import colors from '../constants/colors';

import BaseScreen from '../screens/BaseScreen';
import LaunchScreen from '../screens/LaunchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

import { FluidNavigator } from 'react-navigation-fluid-transitions'

const baseLeftBtn = (navigation) => (
    <TouchableOpacity style={{
        flex: 1,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }} onPress={() => {
        console.log(navigation)
        navigation.goBack()
    }}>
        <Ionicon
            name={"ios-arrow-back"}
            size={32}
            color={colors.link}
            backgroundColor={"transparent"}
        />
    </TouchableOpacity>
)

const baseNavigationOption = (navigation, title, backBtn = true) => ({
    title: navigation.state.params && navigation.state.params.title ? navigation.state.params.title : title,
    gesturesEnabled: false,
    headerTintColor: colors.link,
    tintColor: colors.link,
    headerStyle: {
        backgroundColor: colors.white,
        elevation: null,
    },
    headerLeft: backBtn && baseLeftBtn(navigation)
})

const CategoriesStack = StackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Categorias", false),
        }
    }
)

const CategoriesNavigator = FluidNavigator(
    {
        Categories: {
            screen: CategoriesStack,
        },
        Store: {
            screen: StoreScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Loja"),
        },
    }, {
        initialRouteName: "Categories"
    }
);
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
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Carrinho", false),
        }
    }
);

const ProductStack = StackNavigator(
    {
        Product: {
            screen: ProductScreen,
            // navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Product"),
        }
    }
);

export const MainStack = createMaterialTopTabNavigator(
    {
        PerfilStack: {
            screen: BaseScreen
        },
        CategoriesNavigator: {
            screen: CategoriesNavigator
        },
        CartStack: {
            screen: CartStack
        }
    }, {
        initialRouteName: "CategoriesNavigator",
        navigationOptions: {
            gesturesEnabled: true,
            tabBarVisible: false,
        }
    }
)

export const AppNavigator = StackNavigator(
    {
        Launch: LaunchScreen,
        Main: MainStack,
        Product: {
            screen: ProductStack
        }
    }, {
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);