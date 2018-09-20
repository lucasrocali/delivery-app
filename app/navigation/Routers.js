import React from 'react';
import { StyleSheet, Platform, Image, Icon, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions, DrawerNavigator } from 'react-navigation';
import Ionicon from "react-native-vector-icons/Ionicons";

import Colors from '../constants/Colors';

import BaseScreen from '../screens/BaseScreen';

const BaseStack = StackNavigator(
    {
        Base: {
            screen: BaseScreen,
        },
    }
);

export const AppNavigator = StackNavigator(
    {
        Main: {
            screen: BaseStack
        }
    }, {
        navigationOptions: {
            header: null,
        },
    }
);