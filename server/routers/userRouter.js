const express = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../controller/authMiddleware");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // The folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Assuming your route handler is defined in userController.Add_Advertisement
const addAdvertisementRoute = '/addadvertisement';
const uploadEndpoint = '/upload'; // You can change this to match your endpoint



// Define the route for adding advertisements with file upload middleware
router.route(addAdvertisementRoute).post(upload.single('image'), userController.Add_Advertisement);

router.route("/signup").post(userController.signup);
// router.route("/signup").post(userController.signupUser);

router.route("/login").post(userController.loginUser);
router.route('/allAdvertisement').get(userController.getallAdvertisement);
router.route('/getAllUsers').get(userController.getAllUsers);
router.route('/deleteUser/:id').delete(userController.deleteUser);
router.route('/deleteAdvertisement/:id').delete(userController.deleteAdvertisement);
router.route('/getAdvertisementById/:id').get(userController.getAdvertisementById);
router.route('/allAdvertisementu').get(authMiddleware, userController.getallAdvertisementu);

module.exports = router;  
