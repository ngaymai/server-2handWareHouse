import itemService from "../services/itemService";

let handleGetItems = async (req, res) => {
    let id = req.query.id; // all - for list of all iteams, id - for 1 item id

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            items: []
        })
    }

    let items = await itemService.getItems(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        items
    })
}

module.exports = {
    handleGetItems: handleGetItems
}