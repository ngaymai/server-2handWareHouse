import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import itemController from "../controllers/itemController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);
    // router.get('/test', homeController.getTestPage);
    // router.get('/crud', homeController.getCRUD);
    // router.post('/post-crud', homeController.postCRUD);
    // router.get('/get-crud', homeController.displayGetCRUD);
    // router.get('/edit-crud', homeController.getEditCRUD);
    // router.post('/put-crud', homeController.putCRUD);
    // router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.post('/api/add-new-user', userController.handleRegister);
    router.get('/api/get-item', itemController.handleGetItems);
    router.post('/api/add-new-item', itemController.handleAddItem);
    router.put('/api/update-item', itemController.handleUpdateItem);
    router.delete('/api/delete-item', itemController.handleDeleteItem);
    router.post('/api/create-order', itemController.handleCreateOrder);
    router.get('/api/get-orders', itemController.handleGetOrders);
    router.get('/api/get-sell-orders', itemController.handleGetSellOrders);
    router.put('/api/update-order', itemController.handleUpdateOrder);
    router.post('/api/create-payment', itemController.handleCreatePayment);
    router.put('/api/get-payment', itemController.handleGetPayment);
    router.get('/api/get-buy-orders', itemController.handleGetBuyOrders)
    return app.use("/", router);
}

module.exports = initWebRoutes;