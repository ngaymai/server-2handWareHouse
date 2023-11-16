import db from "../models";

let getItems = (iID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (iID === 'all') {
                console.log('Requesting all items');
                items = await db.Product.findAll({
                    include: User
                    // raw: true,
                })
                console.log(items);

            } else if (iID) {
                console.log('Requesting specific items');
                items = await db.Product.findOne({
                    where: { id: iID },
                    include: User,
                    // raw: true,
                })

            }
            resolve(items)
        } catch (e) {
            reject(e)
        }
    })
}


let getAllOrders = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            if (orderId === 'all') {
                console.log('DB fetching all orders');
                orders = await db.Order.findAll({
                    raw: true,
                })

            } else if (orderId) {
                console.log('DB fetching specific order');
                orders = await db.Order.findOne({
                    where: { id: orderId },
                    raw: true,
                })

            }
            resolve(orders)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Order.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getItems: getItems,
    getAllOrders: getAllOrders,
    createNewItem, createNewItem,
}