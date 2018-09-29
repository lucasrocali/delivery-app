
export function loginRequest(user_login) {
    // return {
    //     "error": true
    // }
    return {
        "id": 2,
        "email": "rocali@driver.com",
        "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1MzgxOTAwOTV9.PqPOtf7WFcTmkd7-YCJSRa2Q8T2n1P201Vt0a6oMmms",
        "name": "driver",
        "user_type": "Client",
        "addresses": [
            {
                "id": 6,
                "name": "Casa",
                "state": "SP",
                "city": "São Paulo",
                "neighborhood": "Itaim",
                "street": "Av. São Gabriel",
                "zipcode": 1010010,
                "number": 663,
                "complement": "APT 104",
                "reference": null,
                "lat": null,
                "lng": null
            }
        ],
        "orders": [],
        "managed_store": null,
        "drove_store": null
    };
}

export function signupRequest(user_login) {
    return {
        "error": true
    }
    //   return {
    //         "id": 3,
    //         "name": "lucas",
    //         "email": "rocali@facebook.commmdd3",
    //         "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE1MTk2MDkwODF9.Z5W8s0SdnehZgiG6jTWoP_gGWKyFmyqlvLx_TQJeflE",
    //         "login_type": "Facebook",
    //         "lists": [],
    //         "liked_spots": [],
    //         "checked_spots": [],
    //         "rated_spots": []
    //     };
}

export function getAddressesRequest() {
    return [
        {
            "id": 6,
            "name": "Casa",
            "state": "SP",
            "city": "São Paulo",
            "neighborhood": "Itaim",
            "street": "Av. São Gabriel",
            "zipcode": 1010010,
            "number": 663,
            "complement": "APT 104",
            "reference": null,
            "lat": null,
            "lng": null
        }
    ]
}
export function getStoreRequest() {
    return {
        "id": 1,
        "name": "S1",
        "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
        "price_type": "$$",
        "delivery_estimation": "30 min",
        "menus": [
            {
                "id": 1,
                "name": "M1",
                "products": [
                    {
                        "id": 1,
                        "name": "P1",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                        "options": [
                            {
                                "id": 1,
                                "name": "O1",
                                "min": 1,
                                "max": 1,
                                "sub_options": [
                                    {
                                        "id": 1,
                                        "name": "SO11",
                                        "price": 0
                                    },
                                    {
                                        "id": 1,
                                        "name": "SO11",
                                        "price": 10
                                    },
                                ]
                            },
                            {
                                "id": 11,
                                "name": "O2",
                                "min": 0,
                                "max": 3,
                                "sub_options": [
                                    {
                                        "id": 1,
                                        "name": "SO21",
                                        "price": 0
                                    },
                                    {
                                        "id": 1,
                                        "name": "SO22",
                                        "price": 5
                                    },
                                    {
                                        "id": 1,
                                        "name": "SO23",
                                        "price": 10
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "descp": "Descp ...",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "descp": "Descp ...",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    }
                ]
            },
            {
                "id": 1,
                "name": "M2",
                "products": [
                    {
                        "id": 1,
                        "name": "P1",
                        "descp": "Descp ...",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                        "options": [
                            {
                                "id": 1,
                                "name": "O1",
                                "min": null,
                                "max": null,
                                "sub_options": [
                                    {
                                        "id": 1,
                                        "name": "SO1",
                                        "price": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    }
                ]
            },
            {
                "id": 1,
                "name": "M3",
                "products": [
                    {
                        "id": 1,
                        "name": "P1",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                        "options": [
                            {
                                "id": 1,
                                "name": "O1",
                                "min": null,
                                "max": null,
                                "sub_options": [
                                    {
                                        "id": 1,
                                        "name": "SO1",
                                        "price": null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    },
                    {
                        "id": 1,
                        "name": "P2",
                        "price": 10,
                        "promo_price": 10,
                        "img_url": null,
                    }
                ]
            }
        ],
        "driver_users": []
    }
}

export function getCategoriesRequest() {
    return [
        {
            "id": 1,
            "name": "C1",
            "stores": [
                {
                    "id": 1,
                    "name": "S1",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$$",
                    "delivery_estimation": "30 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                }
            ]
        },
        {
            "id": 1,
            "name": "C1",
            "stores": [
                {
                    "id": 1,
                    "name": "S1",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$$",
                    "delivery_estimation": "30 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                }
            ]
        },
        {
            "id": 1,
            "name": "C1",
            "stores": [
                {
                    "id": 1,
                    "name": "S1",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$$",
                    "delivery_estimation": "30 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                },
                {
                    "id": 1,
                    "name": "S2",
                    "img_url": "https://gds.portal5g-media.com/contentFiles/image/2016/12/VEN/principal/97273_w840h0_1482403716jamp-burger-mushroom-burger.jpg",
                    "price_type": "$",
                    "delivery_estimation": "15 min"
                }
            ]
        }
    ]
}

