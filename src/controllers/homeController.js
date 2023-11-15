import db from '../models/index'
import CRUDService from '../services/CRUDService';
import CRUD from '../services/CRUDService'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let aboutPage = (req, res) => {
    return res.render('aboutPage.ejs');
}

let testPage = (req, res) => {
    return res.render('test/testPage.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    // console.log(req.body);
    // return res.render('post-crudPage.ejs')
    return res.send('hello post');
}
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('======================================')
    console.log(data)
    console.log('########################################')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        console.log('')
    }
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
        let allUser = await CRUDService.getAllUser();
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        })
    } else {
        console.log('')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    let allUser = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: aboutPage,
    getTestPage: testPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    deleteCRUD: deleteCRUD,
    putCRUD: putCRUD,

}