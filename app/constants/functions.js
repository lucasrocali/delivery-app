export const getCartProductTotal = (order_product) => {
    console.log('product_total', order_product)
    const options_total = order_product.selected_options && Object.keys(order_product.selected_options).reduce((total, key) => total + order_product.selected_options[key].reduce((total, so) => total + so.price, 0), 0)
    return order_product.quantity * (order_product.product.current_price + options_total)
}

export const getCartTotal = (order_products) => {
    console.log('product_total total', order_products)
    return order_products ? order_products.reduce((total, order_product) => total + getCartProductTotal(order_product), 0) : 0
}

export const getCartProductSubOptions = (order_product) => {
    console.log('getCartProductSubOptions')
    const { product, quantity, selected_options } = order_product
    const sub_options = []
    Object.keys(selected_options).map((key) => selected_options[key].map((so) => sub_options.push(so)))
    return sub_options
}

export const getCartProductOptionTotal = (order_product) => {
    const options_total = order_product.selected_options && Object.keys(order_product.selected_options).reduce((total, key) => total + order_product.selected_options[key].reduce((total, so) => total + so.price, 0), 0)
    return order_product.quantity * (options_total)
}

export const getCartProductSubOptionsText = (order_product) => {
    const sub_options = getCartProductSubOptions(order_product)
    const sub_option_names = sub_options.map(so => `${so.name} (${so.price})`)
    return sub_option_names.join()
}
