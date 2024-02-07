const { User, Advertisement } = require('../Models/Models');
const cloudinary = require("../utils/cloudinary");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const bodyParser = require('body-parser');

const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle file upload with multer
const upload = multer({ dest: 'uploads/' });

// Controller function for handling advertisement creation with file upload
exports.Add_Advertisement = upload.single('image');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const newPassword =await bcrypt.hash(req.body.password,10)
    await User.create({
      name: req.body.name,
      email: req.body.email,
     
   
      
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Duplicate email' });
  }
}
exports.loginUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: 'error', error: 'Invalid token' };
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({
      name: user.name,
      email: user.email,
    }, 'secret123');
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
};

exports.Add_Advertisement = async (req, res) => {
  try {
    // Get the logged-in user's email from the request object
    const userEmail = req.loggedInUserEmail;
    

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Extract advertisement details from the request body
    const {
      propertyType,
      numPlanned,
      numPiece,
      showPlannedInfo,
      price,
      description,
      Width,
      selectedStatus,
      selectedPayment,
      floorNum,
      blockNumber,
      furnished,
      annex,
      kitchen,
      elevator,
      airConditioning,
      waterHeater,
      electricityAvailability,
      privateRoof,
      inVilla,
      privateEntrance,
      twoEntrances,
      floorNumber,
      roomCount,
      AdvertiserName,
    } = req.body;

    // Create a new advertisement
    const newAdvertisement = new Advertisement({
      AdvertiserName,
    
      propertyType,
      numPlanned,
      numPiece,
      showPlannedInfo,
      price,
      description,
      Width,
      selectedStatus,
      selectedPayment,
      floorNum,
      blockNumber,
      furnished,
      annex,
      kitchen,
      elevator,
      airConditioning,
      waterHeater,
      electricityAvailability,
      privateRoof,
      inVilla,
      privateEntrance,
      twoEntrances,
      floorNumber,
      roomCount,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    console.log( "ddd"+userEmail)
    // Save the advertisement
    await newAdvertisement.save();

    res.status(201).json({ message: 'Advertisement data saved successfully' });
  } catch (error) {
    console.error('Error saving Advertisement data:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


exports.getallAdvertisement = async (req, res) => {
  try {
    const Advertisements = await Advertisement.find();
    console.log(Advertisements);
    res.status(200).json(Advertisements);
  } catch (error) {
    console.error('Error fetching:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.deleteAdvertisement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdvertisement = await Advertisement.findByIdAndDelete(id);

    // Check if the advertisement was found and deleted
    if (!deletedAdvertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    console.error('Error deleting advertisement by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAdvertisementById = async (req, res) => {
  const { id } = req.params;
  try {
    const advertisement = await Advertisement.findById(id);

    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json(advertisement);
  } catch (error) {
    console.error('Error fetching advertisement by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getallAdvertisementu = async (req, res) => {
  try {
    // Get the logged-in user's email from the request object
    const userEmail = req.loggedInUserEmail;

    // Use a case-insensitive query to find advertisements based on the logged-in user's email
    const Advertisements = await Advertisement.find({
      AdvertiserNum: { $regex: new RegExp(userEmail, 'i') },
    });

    console.log(userEmail, Advertisements);
    res.status(200).json(Advertisements);
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// const { User, Advertisement } = require('../Models/Models');
// const cloudinary = require("../utils/cloudinary");

// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const util = require("util");
// const bodyParser = require('body-parser');
// const twilio = require('twilio');

// const multer = require('multer');
// const path = require('path');
// const router = express.Router();  // Add this line
// const mongoose = require("mongoose");  // Add this line
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // Handle file upload with multer
// const upload = multer({ dest: 'uploads/' });

// // Controller function for handling advertisement creation with file upload
// exports.Add_Advertisement = upload.single('image');

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// //Twilio package to OTP
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// // ... rest of your code




// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// exports.signup = async (req, res) => {
//   const { username, email, password, phoneNumber } = req.body;

//   try {
//     const newPassword = await bcrypt.hash(password, 10);

//     // Generate OTP
//     const otp = generateOTP();

//     // Save OTP and phone number to the user document
//     await User.create({
//       username,
//       email,
//       password: newPassword,
//       phoneNumber,
//       otp,
//     });

//     // Send OTP to the user's phone number using Twilio
//     await twilioClient.messages.create({
//       to: `+9625469525`, 
//       from: twilioPhoneNumber,
//       body: `Your verification code is: ${otp}`,
//     });

//     res.json({ status: 'ok' });
//   } catch (err) {
//     console.log(err);
//     res.json({ status: 'error', error: 'Duplicate email or phone number' });
//   }
// };
// exports.loginUser = async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//   });
//   if (!user) {
//     return { status: 'error', error: 'Invalid token' };
//   }
//   const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

//   if (isPasswordValid) {
//     const token = jwt.sign({
//       name: user.name,
//       email: user.email,
//     }, 'secret123');
//     return res.json({ status: 'ok', user: token });
//   } else {
//     return res.json({ status: 'error', user: false });
//   }
// };

// exports.Add_Advertisement = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const {
//       propertyType,
//       numPlanned,
//       numPiece,
//       showPlannedInfo,
//       price,
//       description,
//       Width,
//       selectedStatus,
//       selectedPayment,
//       floorNum,
//       blockNumber,
//       furnished,
//       annex,
//       kitchen,
//       elevator,
//       airConditioning,
//       waterHeater,
//       electricityAvailability,
//       privateRoof,
//       inVilla,
//       privateEntrance,
//       twoEntrances,
//       floorNumber,
//       roomCount,
//     } = req.body;

//     const newAdvertisement = new Advertisement({
//       propertyType,
//       numPlanned,
//       numPiece,
//       showPlannedInfo,
//       price,
//       description,
//       Width,
//       selectedStatus,
//       selectedPayment,
//       floorNum,
//       blockNumber,
//       furnished,
//       annex,
//       kitchen,
//       elevator,
//       airConditioning,
//       waterHeater,
//       electricityAvailability,
//       privateRoof,
//       inVilla,
//       privateEntrance,
//       twoEntrances,
//       floorNumber,
//       roomCount,
//       avatar: result.secure_url,
//       cloudinary_id: result.public_id,
//     });

//     await newAdvertisement.save();

//     res.status(201).json({ message: 'Advertisement data saved successfully' });
//   } catch (error) {
//     console.error('Error saving Advertisement data:', error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// };

// exports.getallAdvertisement = async (req, res) => {
//   try {
//     const Advertisements = await Advertisement.find();
//     console.log(Advertisements);
//     res.status(200).json(Advertisements);
//   } catch (error) {
//     console.error('Error fetching:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.getAdvertisementById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const advertisement = await Advertisement.findById(id);

//     if (!advertisement) {
//       return res.status(404).json({ message: 'Advertisement not found' });
//     }

//     res.status(200).json(advertisement);
//   } catch (error) {
//     console.error('Error fetching advertisement by ID:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

