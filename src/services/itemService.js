import db from "../models";

let getItems = (iID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (iID === 'all') {
                console.log('Requesting all items');
                items = await db.Product.findAll({
                    raw: true,
                })

            } else if (iID) {
                console.log('Requesting specific items');
                items = await db.Product.findOne({
                    where: { id: iID },
                    raw: true,
                })

            }
            resolve(items)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getItems: getItems
}