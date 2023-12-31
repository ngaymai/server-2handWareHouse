import db from "../models"
import bcrypt from 'bcryptjs'
const { QueryTypes } = require('sequelize');
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);

        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'firstName', 'lastName', 'roleId', 'password', 'phoneNumber'],
                    where: { email: email },
                    raw: true,
                })

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';

                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's no longer exist`
                }
                // 

            } else {
                userData.errCode = 1;
                userData.errMessage = "Email isn't exist. Please try other email !"

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}



let getAllUsers = (userId) => {    
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'all') {
                users = await db.User.findAll({

                    attributes: {
                        exclude: ['password'],
                    },

                    include: [
                        {
                            model: db.Product,
                            as: 'products'
                        },
                        {
                            model: db.Order,
                            as: 'orders'
                        },
                        {
                            model: db.Order,
                            as: 'ships'
                        },
                        {
                            model: db.Payment,
                            as: 'payReceivings'
                        },
                        {
                            model: db.Payment,
                            as: 'paySendings'
                        },
                    ],

                    raw: false,
                    nest: true
                })
                // console.log(users)

            } else if (userId) {
                users = await db.User.findOne({
                    // attributes: ['email', 'roleId', 'password'],
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.Product,
                            as: 'products'
                        },
                        {
                            model: db.Order,
                            as: 'orders'
                        },
                        {
                            model: db.Order,
                            as: 'ships'
                        },
                        {
                            model: db.Payment,
                            as: 'payReceivings'
                        },
                        {
                            model: db.Payment,
                            as: 'paySendings'
                        },
                    ],
                    where: { id: userId },
                    raw: false,
                    nest: true,
                })

            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => {
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         let check = await checkUserEmail(data.email)
    //         if (check) {
    //             resolve({
    //                 errCode: 1,
    //                 errMessage: 'Email already exist.'
    //             })
    //         }
    //         let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    //         await db.User.create({
    //             email: data.email,
    //             password: hashPasswordFromBcrypt,
    //             firstName: data.firstName,
    //             lastName: data.lastName,
    //             address: data.address,
    //             phoneNumber: data.phoneNumber,
    //             gender: data.gender === '1' ? true : false,
    //             roleId: data.roleId
    //         }
    //         )
    //         resolve({
    //             errCode: 0,
    //             errMessage: 'OK'
    //         })
    //     } catch (e) {
    //         reject(e);
    //     }
    // })
}

let insertUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exist.'
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                username: data.username,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                image: data.image,
                // gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                // Products: [{}]
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


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: `Update success`
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist. `
                });
            }

        } catch (e) {
            reject(e)
        }
    })

}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.destroy({
                where: {
                    id: userId,
                },
            });
            console.log(user)
            if (user) {
                resolve({
                    errCode: 0,
                    errMessage: 'Delete success'
                });
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: {
                    id: userId,
                },
                include: [db.Product],
                raw: false
            });
            if (user) {
                resolve(user);
            } else {
                resolve({})
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    insertUserData: insertUserData,
}