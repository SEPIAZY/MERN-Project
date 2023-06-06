import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import * as admincontroller from '../controllers/adminController.js';
import * as usercontroller from '../controllers/userController.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
router.route('/additem').post(admincontroller.addItem); // add item in the database
router.route('/userRequest').post(usercontroller.userRequest); // user request item


/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/getitem').get(admincontroller.getAllItems); // get all the items from the database
router.route('/getallcards').get(admincontroller.getAllCards); // search item from the database
router.route('/getUserRequest').get(admincontroller.getUserRequest); // get all the user request from the database
router.route('/getUserAc').get(admincontroller.getUserAc); // get all the user request from the database
router.route('/findUserAc').get(admincontroller.findUserAc); // find all the user request from the database

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password
router.route('/updateitem/:id').put(admincontroller.updateItem); // update item in the database
router.route('/updatecollection/:userid').put(usercontroller.updateCollection); // update item in the database
router.route('/updateUserRequest/:id').put(admincontroller.updateUserRequest); // update request in the database

/** DELETE Methods */
router.route('/deleteitem/:id').delete(admincontroller.deleteItem); // delete item from the database
router.route('/deleteUserRequest/:id').delete(admincontroller.deleteUserRequest); // delete request from the database
router.route('/deleteUserAc/:id').delete(admincontroller.deleteUserAc); // delete user from the database


export default router;