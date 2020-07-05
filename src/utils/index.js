/** To caculate total units for selected locations */
const calculateTotalUnits = (locations) => {
    let total = 0;
    locations.map(location => {
        total += location.quantity
    })
    return total;
}

/** To caculate total cost for selected locations */
const calculateTotalCost = (locations, product) => {
    let totalCost = 0;
    console.log('ti is called')
    locations.map(location => {
        let locationCost = location.fee + (product.price_per_unit * parseInt(location.quantity))
        totalCost += locationCost;
    })
    return totalCost;
}

/** To validate total units locations not to be more than max_unit of products and selected date */
const validateTotalUnits = (total, selectedProduct, dateDiff) => { 
    let max_units = selectedProduct['max_production'];
    let date_max_units = 0;
    if(dateDiff > 3) { // since max_production has only for 3 days.
        date_max_units = max_units[3]
    } else {
        date_max_units = max_units[dateDiff];
    }
    return total > date_max_units;
}

/** To validate quantity input is not empty or not less than or not more than maximum distribution */
const checkValidQuantity = (quantity, location) => {
    if (quantity < 1 || quantity === '' || quantity === null || Number.isNaN(quantity)) {
        return {
            status: false,
            message: 'Quantity should be more than zero'
        };
    } else if (quantity > location.max_dist) {
        return {
            status: false,
            message: 'Quantity should not be more than maximum value'
        };;
    } else {
        return {
            status: true,
            message: ''
        };
    }
}
export default {
    calculateTotalUnits,
    calculateTotalCost,
    validateTotalUnits,
    checkValidQuantity
}