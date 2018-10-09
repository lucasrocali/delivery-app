// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAddress } from '../store/user/action'
import * as cartSelectors from '../store/cart/selector';
import styled from "styled-components";
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import dimensions from '../constants/dimensions';
import { Text, Caption, Cell, TouchableCell } from './styled/index';
import OrderStatusCell from './components/OrderStatusCell';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


const Container = styled.View`
    flex: 1;
    background-color: ${colors.white}
`;

const MapUpdateButton = styled(TouchableCell) ` 
   
`

const Header = styled(Cell) ``


type State = {

}

type Props = {

}
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCZHg31NJuz_Jmlr86g_b_afagq8TdwOYY';
class Base extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        const { order } = props
        this.state = {
            address_location: {
                latitude: order.address.lat,
                longitude: order.address.lng
            },
            updated: false
        };
        this.mapView = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState)
        if (nextProps.order == null) {
            const { navigation } = this.props
            navigation.goBack(null)

            return false
        }
        return true
    }

    render() {
        const { order, driver_location, createAddress } = this.props
        const { address_location, updated } = this.state
        console.log('order', order, driver_location)
        return (
            <Container>
                <FlatList
                    data={order.order_statuses}
                    renderItem={({ item: order_status, index }) => (
                        <OrderStatusCell
                            order_status={order_status}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View>
                            {order && order.address && order.address.lat && order.address.lng &&
                                <MapView
                                    ref={c => this.mapView = c}
                                    style={{ flex: 1, height: 300 }}
                                    region={{
                                        ...address_location,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                    {driver_location ?
                                        <MapViewDirections
                                            origin={{
                                                latitude: driver_location.lat,
                                                longitude: driver_location.lng
                                            }}
                                            destination={address_location}
                                            apikey={GOOGLE_MAPS_APIKEY}
                                            onReady={(result) => {
                                                this.mapView.fitToCoordinates([
                                                    {
                                                        latitude: driver_location.lat,
                                                        longitude: driver_location.lng
                                                    },
                                                    address_location
                                                ], {
                                                        edgePadding: {
                                                            right: (dimensions.width / 20),
                                                            bottom: (dimensions.height / 20),
                                                            left: (dimensions.width / 20),
                                                            top: (dimensions.height / 20),
                                                        }
                                                    });
                                            }}
                                        />
                                        :
                                        <Marker
                                            key={order.token}
                                            draggable
                                            coordinate={address_location}
                                            title={order.token}
                                            description={' '}
                                            onDragEnd={(e) => this.setState({ address_location: e.nativeEvent.coordinate, updated: true })}
                                        />
                                    }
                                    {/* <Marker
                                        draggable
                                        coordinate={address_location}
                                        title={order.token}
                                        description={' '}
                                        onDragEnd={(e) => this.setState({ address_location: e.nativeEvent.coordinate, updated: true })}
                                    />

                                    {driver_location &&
                                        <Marker
                                            coordinate={{
                                                latitude: driver_location.lat,
                                                longitude: driver_location.lng
                                            }}
                                            title={'Driver'}
                                            description={' '}
                                        />
                                    } */}

                                </MapView>
                            }
                            {updated &&
                                <MapUpdateButton
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        this.setState({ updated: false })
                                        createAddress({
                                            ...order.address,
                                            lat: address_location.latitude,
                                            lng: address_location.longitude
                                        }, true)
                                    }}
                                >
                                    <Caption>Atualizar localização</Caption>
                                </MapUpdateButton>
                            }
                            <Header>
                                <Text>{'#' + order.token + ' ' + order.store.name}</Text>
                                <Caption>{order.address.street + ', ' + order.address.number}</Caption>
                                <Caption>{order.total_text}</Caption>
                            </Header>
                        </View>
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        order: cartSelectors.getOpenedOrder(state),
        driver_location: cartSelectors.getCartLocation(state)
    }),
    { createAddress }
)(Base)