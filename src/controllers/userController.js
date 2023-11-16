import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // all, id

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            users: []
        })
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let data = req.body; // all, id

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            users: []
        })
    }

    let message = await userService.createNewUser(data);

    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let id = req.body.id; // all, id
    console.log(req.body)
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value'
        })
    }

    let message = await userService.deleteUserById(id);

    return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
    let data = req.body; // all, id

    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await userService.updateUserData(data);

    return res.status(200).json(message);
}

let handleRegister = async (req, res) => {
    let data = req.body
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
        })
    }

    let message = await userService.insertUserData(data);

    return res.status(200).json(message);
    
}




let handleGetItems = async (req, res) => {
    let id = req.query.id; // all - for list of all iteams, id - for 1 item id

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter value',
            users: []
        })
    }

    let items = await userService.getItems(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        items
    })
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleRegister: handleRegister,
    handleGetItems: handleGetItems
}