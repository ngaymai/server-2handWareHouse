import db from "../models";

let getItems = (iID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (iID === 'all') {
                items = await db.Product.findAll({
                    raw: true,
                })
                console.log(items);

            } else if (iID) {
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
    createNewItem, createNewItem,
}