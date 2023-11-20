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
                    // all: true,
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
                urls.forEach(async (url, index) => {
                    await createImage(url, product.id, index)
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
                categories.forEach(async (categ, index) => {
                    await mapCategory(categ, product.id, index)
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

let mapCategory = (category, id, index) => {
    console.log(category, id)

    return new Promise(async (resolve, reject) => {
        try {
            await db.MapCategory.create({
                categoryId: category,
                productId: id,
                index: index
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

let createImage = (url, id, index) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Image.create({
                url: url,
                productId: id,
                index: index,
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
                if (data.location) {
                    console.log("update location")

                    let location = await db.ShopLocation.update(
                        {
                            country: data.location.country,
                            province: data.location.province,
                            city: data.location.city,
                            address: data.location.address
                        },
                        {
                            where: {
                                productId: product.id
                            },
                            raw: false
                        }

                    )
                    // await location.save()
                }

                if (data.image) {
                    console.log("update image")
                    let urls = data.image
                    urls.map(async (url, index) => await updateItemImage(url, product.id, index))
                }

                if (data.category) {
                    console.log("update category")
                    let categories = data.category
                    categories.map(async (categ, index) => await updateItemCategory(categ, product.id, index))

                }
                console.log("update product")
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

let updateItemImage = (url, id, index) => {
    return new Promise(async (resolve, reject) => {
        try {
            let image = await db.Image.update(
                {
                    url: url
                },
                {
                    where: {
                        productId: id,
                        index: index,
                    },
                    raw: false
                })

            // image.save()
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateItemCategory = (category, id, index) => {
    console.log(category, id)

    return new Promise(async (resolve, reject) => {
        try {
            let map = await db.MapCategory.update({
                categoryId: category,
            }, {
                where: {
                    productId: id,
                    index: index
                },
                raw: false
            })
            // map.save()
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteItemById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.destroy({
                where: {
                    id: productId
                }
            })

            if (res) {
                resolve({
                    errCode: 0,
                    errMessage: 'Delete success',
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `Product isn't exist`,
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}


///////////////////////////////////////////    ORDER    ///////////////////////////////////////////////////////////////////
let createReceivePlace = (data, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let place = await db.ReceivingPlace.create({
                country: data.country,
                province: data.province,
                city: data.city,
                address: data.address,
                orderId: id,
            })
            console.log('sucessfully added delivery location: ', place);
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
    console.log(data)
    // console.log(data.buyerId)
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.create({
                userProposedPrice: data.proposedPrice,
                purQuantity: data.quantity,
                purShippingFee: data.shippingFee,
                status: 'waiting',
                userId: data.buyerId,
                shipperId: data.shipperId,
                productId: data.productId
            })
            console.log("Inserted Order: ", order)

            if (data.receivePlace) {
                // console.log('Got receive place: ',data.receivePlace)
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

let getAllOrders = (uId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = null;
            if (uId === 'all') {
                console.log('DB fetching all orders');

                let fetchData = async () => {
                    orders = await db.Order.findAll({
                        include: [
                            { model: db.User, as: 'shipper' },
                            { model: db.User, as: 'buyer' },
                            { model: db.Product, as: 'product' },
                            { model: db.ReceivingPlace, as: 'receivingPlace' }
                        ],
                        raw: false,
                        nest: true
                    });
                    // console.log('--> fetched orders')
                }

                let addShop = () => {
                    return new Promise(async (resolve, reject) => {
                        if (orders.length != 0) {
                            let shopLoc = null;
                            var addShopsLoop = new Promise((resolve, reject) => {
                                orders.forEach(async (order, index) => {
                                    // Append shop location to each order
                                    shopLoc = await db.ShopLocation.findOne({
                                        where: { productId: order.product.id },
                                        raw: false
                                    });
                                    // console.log("Found order's shop: ", shopLoc.dataValues);
                                    if (shopLoc) orders[index].dataValues['shopLocation'] = shopLoc.dataValues;
                                    else orders[index].dataValues['shopLocation'] = null;
                                    if (index === orders.length - 1) resolve();
                                })
                            });

                            addShopsLoop.then(() => {
                                // console.log('All shops added!');
                                resolve();
                            });
                        }
                        else {
                            resolve();
                        }
                    })
                }


                let returnData = () => {
                    // console.log('Final orders:\n', orders)
                    // console.log('--> returning data')
                    resolve(orders);
                }

                fetchData()
                    .then(() => addShop())
                    .then(() => returnData())
            }
            else if (uId) {
                console.log('DB fetching orders for a user');

                let fetchData = async () => {
                    orders = await db.Order.findAll({
                        where: { userId: uId },
                        include: [
                            { model: db.User, as: 'shipper' },
                            { model: db.Product, as: 'product' },
                            { model: db.ReceivingPlace, as: 'receivingPlace' }
                        ],
                        raw: false,
                        nest: true
                    });
                    // console.log('--> fetched orders')
                }

                let addShop = () => {
                    return new Promise(async (resolve, reject) => {
                        if (orders.length != 0) {
                            let shopLoc = null;
                            var addShopsLoop = new Promise((resolve, reject) => {
                                orders.forEach(async (order, index) => {
                                    // Append shop location to each order
                                    shopLoc = await db.ShopLocation.findOne({
                                        where: { productId: order.product.id },
                                        raw: false
                                    });
                                    // console.log("Found order's shop: ", shopLoc.dataValues);
                                    if (shopLoc) orders[index].dataValues['shopLocation'] = shopLoc.dataValues;
                                    else orders[index].dataValues['shopLocation'] = null;
                                    if (index === orders.length - 1) resolve();
                                })
                            });

                            addShopsLoop.then(() => {
                                // console.log('All shops added!');
                                resolve();
                            });
                        }
                        else {
                            resolve();
                        }
                    })
                }


                let returnData = () => {
                    // console.log('Final orders:\n', orders)
                    // console.log('--> returning data')
                    resolve(orders);
                }

                fetchData()
                    .then(() => addShop())
                    .then(() => returnData())
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getSellOrders = (uid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allOrders = await getAllOrders('all');
            let ret = [];
            if (allOrders.length > 0) {
                var filterOrdersLoop = new Promise((resolve, reject) => {
                    allOrders.forEach(async (order, index) => {
                        if (uid === order.dataValues.product.userId.toString()) {
                            ret.push(order);
                        }

                        if (index === allOrders.length - 1) resolve();
                    })
                });

                filterOrdersLoop.then(() => {
                    resolve(ret);
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let updateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.update(
                {
                    shipperId: data.shipperId,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            )

            if (order) {
                if (data.receivePlace) {
                    console.log(data.receivePlace)
                    await db.ReceivingPlace.update(
                        {
                            country: data.receivePlace.country,
                            province: data.receivePlace.province,
                            city: data.receivePlace.city,
                            address: data.receivePlace.address,

                        },
                        {
                            where: {
                                orderId: data.id,
                            }
                        }
                    )
                }

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

let createPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = await db.Payment.create({
                payAmount: data.amount,
                payMethod: data.method,
                transactionId: data.transactionId,
                orderId: data.orderId,
                senderId: data.senderId,
                receiverId: data.receiverId,

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

let getPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = ''
            if (data.senderId) {
                payment = await db.Payment.findAll({
                    where: {
                        senderId: data.senderId
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'sender'
                        },
                        {
                            model: db.User,
                            as: 'receiver'
                        },
                        {
                            model: db.Order,
                            as: 'order'
                        },

                    ],
                    raw: false,
                    nest: true
                })
            } else if (data.receiverId) {
                payment = await db.Payment.findAll({
                    where: {
                        receiverId: data.receiverId
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'sender'
                        },
                        {
                            model: db.User,
                            as: 'receiver'
                        },
                        {
                            model: db.Order,
                            as: 'order'
                        },

                    ],
                    raw: false,
                    nest: true
                })
            } else if (data.transactionId) {
                payment = await db.Payment.findAll({
                    where: {
                        transactionId: data.transactionId
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'sender'
                        },
                        {
                            model: db.User,
                            as: 'receiver'
                        },
                        {
                            model: db.Order,
                            as: 'order'
                        },
                        
                    ],
                    raw: false,
                    nest: true
                })
            } else if (data.orderId) {
                payment = await db.Payment.findOne({
                    where: {
                        orderId: data.orderId
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'sender'
                        },
                        {
                            model: db.User,
                            as: 'receiver'
                        },
                        {
                            model: db.Order,
                            as: 'order'
                        },
                        
                    ],
                    raw: false,
                    nest: true
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                payment: payment
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getItems: getItems,
    createNewItem: createNewItem,
    updateItemData: updateItemData,
    deleteItemById: deleteItemById,
    createNewOrder: createNewOrder,
    getAllOrders: getAllOrders,
    getSellOrders: getSellOrders,
    updateOrder: updateOrder,
    createPayment: createPayment,
    getPayment: getPayment,
}