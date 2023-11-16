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
            users: []
        })
    }

    let message = await userService.createNewItem(data);

    return res.status(200).json(message);
}

module.exports = {
    handleGetItems: handleGetItems,
    handleAddItem: handleAddItem,
}