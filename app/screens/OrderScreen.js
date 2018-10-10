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
import assets from '../constants/assets';
import { Text, Caption, Cell, TouchableCell } from './styled/index';
import OrderStatusCell from './components/OrderStatusCell';
import MapView, { Marker, Callout } from 'react-native-maps';
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
const GOOGLE_MAPS_APIKEY = 'AIzaSyCZHg31NJuz_Jmlr86g_b_afagq8TdwOYY';
class Base extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        const { order } = props
        this.state = {
            address_location: {
                latitude: order.address.latitude,
                longitude: order.address.longitude
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
        console.log('order', this.props, this.state, order, driver_location)
        return (
            <Container>
                {address_location && address_location.latitude && address_location.longitude &&
                    <MapView
                        provider={'google'}
                        ref={c => this.mapView = c}
                        style={{ flex: 1 }}
                        initialRegion={{
                            ...address_location,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                    >
                        {address_location && address_location.latitude && address_location.longitude &&
                            <Marker
                                draggable
                                coordinate={address_location}
                                onDragEnd={(e) => this.setState({ address_location: e.nativeEvent.coordinate, updated: true })}
                            >
                                <Callout>
                                    <Text>You are here</Text>
                                </Callout>
                            </Marker>
                        }
                        {driver_location && driver_location.latitude && driver_location.longitude &&
                            <Marker
                                pinColor="#25a25a"
                                coordinate={driver_location}
                                image={require('../screens/assets/moto.png')}
                            >
                                <Callout>
                                    <Text>Rider is here</Text>
                                </Callout>
                            </Marker>
                        }
                        {address_location && driver_location &&
                            <MapViewDirections
                                origin={driver_location}
                                destination={address_location}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={5}
                                strokeColor={colors.link}
                                onReady={(result) => {
                                    driver_location && address_location && this.mapView.fitToCoordinates([
                                        driver_location,
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
                            />}
                    </MapView>
                }
                <FlatList
                    data={order.order_statuses}
                    renderItem={({ item: order_status, index }) => (
                        <OrderStatusCell
                            order_status={order_status}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View>
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