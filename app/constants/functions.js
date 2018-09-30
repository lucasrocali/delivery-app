export const getCartProductTotal = (cart_product) => {
    const options_total = cart_product.selected_options && Object.keys(cart_product.selected_options).reduce((total, key) => total + cart_product.selected_options[key].reduce((total, so) => total + so.price, 0), 0)
    return cart_product.quantity * (cart_product.product.current_price + options_total)
}

export const getCartTotal = (cart_products) => {
    return cart_products.reduce((total, cart_product) => total + getCartProductTotal(cart_product), 0)
}

export const getCartProductSubOptions = (cart_product) => {
    const { product, quantity, selected_options } = cart_product
    const sub_options = []
    Object.keys(selected_options).map((key) => selected_options[key].map((so) => sub_options.push(so)))
    return sub_options
}

export const getCartProductOptionTotal = (cart_product) => {
    const options_total = cart_product.selected_options && Object.keys(cart_product.selected_options).reduce((total, key) => total + cart_product.selected_options[key].reduce((total, so) => total + so.price, 0), 0)
    return cart_product.quantity * (options_total)
}

export const getCartProductSubOptionsText = (cart_product) => {
    const sub_options = getCartProductSubOptions(cart_product)
    const sub_option_names = sub_options.map(so => `${so.name} (${so.price})`)
    return sub_option_names.join()
}
