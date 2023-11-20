import itemService from "../services/itemService";

let handleGetItems = async (req, res) => {
    let id = req.query.id; // all - for list of all iteams, id - for 1 item id
    console.log(id);
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            items: []
        })
    }

    let items = await itemService.getItems(id);
    console.log('Queried:', items);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        items
    })
}

let handleAddItem = async (req, res) => {
    let data = req.body; // all, id

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.createNewItem(data);

    return res.status(200).json(message);
}

let handleUpdateItem = async (req, res) => {
    let data = req.body;

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.updateItemData(data);

    return res.status(200).json(message);
}

let handleDeleteItem = async (req, res) => {
    let id = req.body.id; // all, id

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value'
        })
    }

    let message = await itemService.deleteItemById(id);

    return res.status(200).json(message);
}


let handleCreateOrder = async (req, res) => {
    let data = req.body; // all, id

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.createNewOrder(data);

    return res.status(200).json(message);
}

let handleGetOrders = async (req, res) => {
    let uid = req.query.uid; // all, id
    console.log('Getting order for user:', uid);

    if (!uid) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            orders: []
        })
    }

    let orders = await itemService.getAllOrders(uid);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        orders
    })
}

let handleGetSellOrders = async (req, res) => {
    let uid = req.query.uid; // all, id
    console.log('Getting order for seller:', uid);

    if (!uid) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            orders: []
        })
    }

    let orders = await itemService.getSellOrders(uid);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        orders
    })
}

let handleUpdateOrder = async (req, res) => {
    let data = req.body

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.updateOrder(data);

    return res.status(200).json(message);

}

let handleCreatePayment = async (req, res) => {
    let data = req.body
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.createPayment(data);

    return res.status(200).json(message);
}

let handleGetPayment = async (req, res) => {
    let data = req.body
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await itemService.getPayment(data);

    return res.status(200).json(message);
}


module.exports = {
    handleGetItems: handleGetItems,
    handleAddItem: handleAddItem,
    handleUpdateItem: handleUpdateItem,
    handleDeleteItem: handleDeleteItem,
    handleCreateOrder: handleCreateOrder,
    handleGetOrders: handleGetOrders,
    handleGetSellOrders: handleGetSellOrders,
    handleUpdateOrder: handleUpdateOrder,
    handleCreatePayment: handleCreatePayment,
    handleGetPayment: handleGetPayment
}