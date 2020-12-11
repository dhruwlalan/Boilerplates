const router = require('express').Router({ strict: true });
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

///REST API - /api/users/*///

///Open Routes///
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/forgetPassword', userController.forgetPassword);
router.patch('/resetPassword/:token', userController.resetPassword);

///Check if the user is already logged in///
router.use(authController.isLoggedIn);

///Logged In Routes///
router.use(authController.protect);
router.patch('/updateMyData', userController.updateData);
router.patch('/updateMyPassword', userController.updatePassword);

///Admin Routes CRUD///
router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router
   .route('/:id')
   .get(userController.getUser)
   .patch(userController.updateUser)
   .delete(userController.deleteUser);

///Handle Undefined Routes///
router.all('*', (req, res) => {
   res.status(404).json({
      status: '404',
      unknownRoute: req.originalUrl,
   });
});

///Export Router///
module.exports = router;
