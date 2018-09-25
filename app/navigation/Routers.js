import React from 'react';
import { StyleSheet, Platform, Image, Icon, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions, DrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Ionicon from "react-native-vector-icons/Ionicons";

import colors from '../constants/colors';

import BaseScreen from '../screens/BaseScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

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
        },
        Store: {
            screen: StoreScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Loja"),
        },
        Product: {
            screen: ProductScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Produto"),
        }
    }, {
        initialRouteName: "Categories"
    }
);

const CartStack = StackNavigator(
    {
        Cart: {
            screen: BaseScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, "Carrinho", false),
        }
    }
);

export const AppNavigator = createMaterialTopTabNavigator(
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

// export const AppNavigator = StackNavigator(
//     {
//         Main: MainStack
//     }, {
//         navigationOptions: {
//             header: null,
//         },
//     }
// );