export const getCartProductTotal = (product, quantity, selected_options) => {
    const options_total = selected_options && Object.keys(selected_options).reduce((total, key) => total + selected_options[key].reduce((total, so) => total + so.price, 0), 0)
    return quantity * (product.price + options_total)
}

export const getCartProductSubOptions = (product, quantity, selected_options) => {
    const sub_options = []
    Object.keys(selected_options).map((key) => selected_options[key].map((so) => sub_options.push(so)))
    return sub_options
}
