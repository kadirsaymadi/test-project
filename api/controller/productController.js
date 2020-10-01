const fs = require('fs');

// get product list
exports.getProductList = async (req, res, next) => {

    let rawdata = fs.readFileSync('helper/data.json');
    let products = JSON.parse(rawdata);
    res.json({
        statusCode: 200,
        response: {
            products
        }
    });
}