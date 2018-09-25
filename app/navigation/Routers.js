import React from 'react';
import { StyleSheet, Platform, Image, Icon, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions, DrawerNavigator } from 'react-navigation';
import Ionicon from "react-native-vector-icons/Ionicons";

import colors from '../constants/colors';

import BaseScreen from '../screens/BaseScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

const CategoriesStack = StackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
        },
        Store: {
            screen: StoreScreen
        },
        Product: {
            screen: ProductScreen
        }
    }, {
        initialRouteName: "Categories"
    }
);

export const AppNavigator = StackNavigator(
    {
        Main: {
            screen: CategoriesStack
        }
    }, {
        navigationOptions: {
            header: null,
        },
    }
);