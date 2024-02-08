  const mongoose = require("mongoose");

  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { collection: 'user-data' });


  const AdvertisementSchema = new mongoose.Schema({
    // images: [{
    //   filename: { type: String, required: true },
    //   path: { type: String, required: true },
    // }],
    AdvertiserName: { type: String, required: false },
    AdvertiserNum: { type: String,required: false },
    numPlanned: { type: String, required: false },
  numPiece: { type: String, 
    required: false },
    showPlannedInfo: { type: String, 
      required: false
    },
    price: { type: String, required: false },
    description: { type: String, required: false },
    Width : { type: String, required: false },
    selectedStatus : { type: String, required: false },
    selectedPayment: { type: String, required: false },
    floorNum: { type: String, required: false },
    blockNumber: { type: String, required: false },
    furnished: { type: Object,
      default: false,},
    annex: { type: Object,
      default: false,},
    kitchen : { type: Object,
      default: false,},
    elevator : {type: Object,
      default: false,},
    airConditioning : { type: Object,
      default: false,},
    waterHeater : { type: Object,
      default: false,},
    electricityAvailability : { type: Object,
      default: false,},
    privateRoof : { type: Object,
      default: false,},
    inVilla : { type: Object,
      default: false,},
    privateEntrance: { type: Object,
      default: false,},
    twoEntrances : {  type: Object,
      default: false,},
    floorNumber : { type: String, required: false },
    roomCount: { type: String, required: false },
    propertyType: {
      type: String,
      enum: ['land', 'apartment', 'BuildingsForSale', 'ShopsForRent', 'VillasForSale', 'FarmsForSale', 'VillasForRent', 'WarehousesForRent', 'FurnishedApartments',"apartmentsForRent"],
      default: 'ApartmentsForSale',},
      cloudinary_id: {
        type: String,
      },
      avatar: {
        type: String,
      },
      AdvertiserEmail: {
        type: String,
        required: false
      },

  }, { collection: 'Advertisement-data' });


  const User = mongoose.model('User', UserSchema);

  const Advertisement = mongoose.model('Advertisement', AdvertisementSchema);


  module.exports = { User,Advertisement };

