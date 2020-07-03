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
    locations.map(location => {
        let locationCost = location.fee + (product.price_per_unit * parseInt(location.quantity))
        totalCost += locationCost;
    })
    return totalCost;
}

/** To validate total units locations not to be more than max_unit of products and selected date */
const validateTotalUnits = (total, selectedProduct, dateDiff) => { 
    let max_units = selectedProduct['max_production'];
    let date_max_units = max_units[dateDiff];
    return total < date_max_units;
}

export default {
    calculateTotalUnits,
    calculateTotalCost,
    validateTotalUnits
}