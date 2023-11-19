import db from "../models";

let getItems = (iID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let items = '';
            if (iID === 'all') {
                console.log('Requesting all items');
                items = await db.Product.findAll({
                    include: [
                        {
                            model: db.User,
                            as: 'user'
                        },
                        {
                            model: db.Image,
                            as: 'images'
                        },
                        {
                            model: db.ShopLocation,
                            as: 'location'
                        },
                        {
                            model: db.Category,
                            as: 'categories'
                        },
                        {
                            model: db.Order,
                            as: 'orders'
                        }],
                    nest: true,
                    raw: false,
                })
                console.log(items);

            } else if (iID) {
                console.log('Requesting specific items');
                items = await db.Product.findOne({
                    where: { id: iID },
                    include: [
                        {
                            model: db.User,
                            as: 'user'
                        },
                        {
                            model: db.Image,
                            as: 'images'
                        },
                        {
                            model: db.ShopLocation,
                            as: 'location'
                        },
                        {
                            model: db.Category,
                            as: 'categories'
                        },
                        {
                            model: db.Order,
                            as: 'orders'
                        }
                    ],
                    raw: false,
                    nest: true
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
            let product = await db.Product.create({
                prodName: data.productName,
                prodQuantity: data.productQuantity,
                prodDesc: data.productDescription,
                prodAskPrice: data.productAskPrice,
                prodPhone: data.productPhone,
                userId: data.userId,

            })
            // console.log(product)
            if (data.image) {
                let urls = data.image
                console.log(urls)
                urls.forEach(async (url) => {
                    await createImage(url, product.id)
                });
            };

            if (data.location) {
                console.log(data.location)
                let temp = async (data, id) => await createShopLocation(data, id);

                temp(data.location, product.id);

            }

            if (data.category) {
                let categories = data.category
                console.log(categories)
                categories.forEach(async (categ) => {
                    await mapCategory(categ, product.id)
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createShopLocation = (data, id) => {
    console.log('create shop')
    return new Promise(async (resolve, reject) => {
        try {
            await db.ShopLocation.create({
                country: data.country,
                province: data.province,
                city: data.city,
                address: data.address,
                productId: id,
            })
            console.log('insert location ok');
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let mapCategory = (category, id) => {
    console.log(category, id)

    return new Promise(async (resolve, reject) => {
        try {
            await db.MapCategory.create({
                categoryId: category,
                productId: id,
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

let createImage = (url, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Image.create({
                url: url,
                productId: id,
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

let updateItemData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: data.id,
                },
                raw: false,
            });
            if (product) {
                product.prodName = data.productName;
                product.prodQuantity = data.productQuantity;
                product.prodDesc = data.productDescription;
                product.prodAskPrice = data.productAskPrice;
                product.prodPhone = data.productPhone;
                await product.save();

                resolve({
                    errCode: 0,
                    errMessage: `Update success`
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `Product isn't exist. `
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let deleteItemById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findOne({
                where: {
                    id: productId,
                },
                include: [
                    db.Image, db.ShopLocation
                ]
            });
            if (res) {
                let res2 = await db.Order.findAll({
                    where: {
                        productId: productId
                    }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Delete success',
                    product: res,
                    order: res2
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `Product isn't exist`
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}


///////////////////////////////////////////    ORDER    ///////////////////////////////////////////////////////////////////
let createReceivePlace = (data, id) => {
    console.log('create order receive place')
    return new Promise(async (resolve, reject) => {
        try {
            await db.ReceivingPlace.create({
                country: data.country,
                province: data.province,
                city: data.city,
                address: data.address,
                orderId: id,
            })
            console.log('sucessfully added delivery location');
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createNewOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.create({
                userProposedPrice: data.proposedPrice,
                purQuantity: data.quantity,
                purShippingFee:data.shippingFee,
                status:'waiting',
                userId: data.buyerId,
                productId: data.productId
            })
            console.log("Inserted Order: ",order)

            if (data.receivePlace) {
                console.log('Got receive place: ',data.receivePlace)
                let insertReicevePlace = async (data, id) => await createReceivePlace(data, id);

                insertReicevePlace(data.receivePlace, order.id);
            }

            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
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
                    include: [
                        {model:db.User, as: 'shipper'}, 
                        {model:db.Product, as: 'product'}
                    ],
                    raw: false,
                    nest: true
                })
                console.log("end test")

            } else if (orderId) {
                console.log('DB fetching specific order');
                orders = await db.Order.findOne({
                    where: { id: orderId },
                    include: [
                        {model:db.User, as: 'shipper'}, 
                        {model:db.Product, as: 'product'}
                    ],
                    raw: false,
                    nest: true
                })

            }
            resolve(orders)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getItems: getItems,
    createNewItem: createNewItem,
    updateItemData: updateItemData,
    deleteItemById: deleteItemById,
    createNewOrder: createNewOrder,
    getAllOrders: getAllOrders
}