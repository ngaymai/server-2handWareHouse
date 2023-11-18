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


let getAllOrders = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = '';
            if (orderId === 'all') {
                console.log('DB fetching all orders');
                orders = await db.Order.findAll({
                    include: [db.User, db.Product],
                    raw: false,
                    nest: true
                })
                console.log("end test")

            } else if (orderId) {
                console.log('DB fetching specific order');
                orders = await db.Order.findOne({
                    where: { id: orderId },
                    include: [db.User, db.Product],
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
                            country: data.country,
                            province: data.province,
                            city: data.city,
                            address: data.address
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

module.exports = {
    getItems: getItems,
    getAllOrders: getAllOrders,
    createNewItem: createNewItem,
    updateItemData: updateItemData,
    deleteItemById: deleteItemById
}