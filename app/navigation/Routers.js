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
import PerfilScreen from '../screens/PerfilScreen';
import AddressesScreen from '../screens/AddressesScreen';
import AddressScreen from '../screens/AddressScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import PickerScreen from '../screens/PickerScreen';

import { } from '../screens/styled'
// import { FluidNavigator } from 'react-navigation-fluid-transitions'

const icon_names = {
    back: 'ios-arrow-back',
    forward: 'ios-arrow-forward',
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


export const screenNames = {
    Launch: 'Launch',
    Categories: 'Categories',
    Store: 'Store',
    Cart: 'Cart',
    Product: 'Product',
    SocialLogin: 'SocialLogin',
    Login: 'Login',
    Perfil: 'Perfil',
    Address: 'Address',
    Addresses: 'Addresses',
    Picker: 'Picker',
    Base: 'Base',
    CategoriesStack: 'CategoriesStack',
    StoreStack: 'StoreStack',
    CartStack: 'CartStack',
    ProductStack: 'ProductStack',
    LoginStack: 'LoginStack',
    PerfilStack: 'PerfilStack',
    AddressesStack: 'AddressesStack',
    PickerStack: 'PickerStack',
    BaseStack: 'BaseStack',


}
export const screens = {
    [screenNames.Launch]: {
        name: screenNames.Launch,
        component: {
            screen: LaunchScreen,
            navigationOptions: {
                header: null,
            }
        }
    },
    [screenNames.Categories]: {
        name: screenNames.Categories,
        component: {
            screen: CategoriesScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: 'Categorias',
                leftIcon: icon_names.person,
                leftRouteName: screenNames.LoginStack,
                rightIcon: icon_names.cart,
                rightRouteName: screenNames.CartStack
            }),
        }
    },
    [screenNames.Store]: {
        name: screenNames.Store,
        component: {
            screen: StoreScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: 'Loja',
            }),
        }
    },
    [screenNames.Cart]: {
        name: screenNames.Cart,
        component: {
            screen: CartScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Carrinho",
                leftIcon: icon_names.back,
                leftRouteName: screenNames.Categories,
            }),
        }
    },
    [screenNames.Product]: {
        name: screenNames.Product,
        component: {
            screen: ProductScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Produto",
            }),
        }
    },
    [screenNames.SocialLogin]: {
        name: screenNames.SocialLogin,
        component: {
            screen: SocialLoginScreen,
            navigationOptions: {
                header: null,
            }
        }
    },
    [screenNames.Login]: {
        name: screenNames.Login,
        component: {
            screen: LoginScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Fazer Login",
                leftIcon: icon_names.back,
            }),
        }
    },
    [screenNames.Perfil]: {
        name: screenNames.Perfil,
        component: {
            screen: PerfilScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Perfil",
                rightIcon: icon_names.forward,
                rightRouteName: screenNames.Categories,
            }),
        }
    },
    [screenNames.Address]: {
        name: screenNames.Address,
        component: {
            screen: AddressScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Endereço",
                leftIcon: icon_names.back
            }),
        }
    },
    [screenNames.Addresses]: {
        name: screenNames.Addresses,
        component: {
            screen: AddressesScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: "Endereços",
            }),
        }
    },
    [screenNames.Picker]: {
        name: screenNames.Picker,
        component: {
            screen: PickerScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: 'Picker',
            }),
        }
    },
    [screenNames.Base]: {
        name: screenNames.Base,
        component: {
            screen: BaseScreen,
            navigationOptions: ({ navigation }) => baseNavigationOption(navigation, {
                title: 'Base',
            }),
        }
    }
}

export const stacks = {
    [screenNames.CategoriesStack]: {
        name: screenNames.CategoriesStack,
        component: StackNavigator(
            {
                [screens.Categories.name]: screens.Categories.component
            }
        )
    },
    [screenNames.StoreStack]: {
        name: screenNames.StoreStack,
        component: StackNavigator(
            {
                [screens.Store.name]: screens.Store.component
            }
        )
    },
    [screenNames.CartStack]: {
        name: screenNames.CartStack,
        component: StackNavigator(
            {
                [screens.Cart.name]: screens.Cart.component
            }
        )
    },
    [screenNames.ProductStack]: {
        name: screenNames.ProductStack,
        component: StackNavigator(
            {
                [screens.Product.name]: screens.Product.component
            }
        )
    },
    [screenNames.LoginStack]: {
        name: screenNames.LoginStack,
        component: StackNavigator(
            {
                [screens.SocialLogin.name]: screens.SocialLogin.component,
                [screens.Login.name]: screens.Login.component
            }
        )
    },
    [screenNames.PerfilStack]: {
        name: screenNames.PerfilStack,
        component: StackNavigator(
            {
                [screens.Perfil.name]: screens.Perfil.component
            }
        )
    },
    [screenNames.AddressesStack]: {
        name: screenNames.AddressesStack,
        component: StackNavigator(
            {
                [screens.Addresses.name]: screens.Addresses.component,
                [screens.Address.name]: screens.Address.component,
            }
        )
    },
    [screenNames.PickerStack]: {
        name: screenNames.PickerStack,
        component: StackNavigator(
            {
                [screens.Picker.name]: screens.Picker.component
            }
        )
    },
    [screenNames.BaseStack]: {
        name: screenNames.BaseStack,
        component: StackNavigator(
            {
                [screens.Base.name]: screens.Base.component
            }
        )
    }
}

export const mainStack = {
    Main: {
        name: 'Main',
        component: createMaterialTopTabNavigator(
            {
                [stacks.PerfilStack.name]: {
                    screen: stacks.PerfilStack.component
                },
                [stacks.CategoriesStack.name]: {
                    screen: stacks.CategoriesStack.component
                },
                [stacks.CartStack.name]: {
                    screen: stacks.CartStack.component
                }
            }, {
                initialRouteName: stacks.CategoriesStack.name,
                navigationOptions: {
                    gesturesEnabled: true,
                    tabBarVisible: false,
                }
            }
        )
    }
}

export const AppNavigator = StackNavigator(
    {
        [screens.Launch.name]: screens.Launch.component,
        [mainStack.Main.name]: mainStack.Main.component,
        [stacks.ProductStack.name]: stacks.ProductStack.component,
        [screens.Store.name]: screens.Store.component,
        [stacks.LoginStack.name]: stacks.LoginStack.component,
        [stacks.AddressesStack.name]: stacks.AddressesStack.component,
        [stacks.PickerStack.name]: stacks.PickerStack.component
    }, {
        initialRouteName: screens.Launch.name,
        // initialRouteName: stacks.AddressesStack.name,
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    }
);