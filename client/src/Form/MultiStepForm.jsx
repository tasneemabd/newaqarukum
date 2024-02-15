


// MultiStepForm.js
import React, { useEffect, useState } from 'react';
import './MultiStepForm.css';
import { Button, Form, FormCheckLabel, FormControl, FormLabel } from 'react-bootstrap';
import { Checkbox, FormControlLabel, RadioGroup } from '@mui/material';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import renderApartmentForm from './renderApartmentForm ';
import RenderLandForm from './RenderLandForm';
import { useLocation, useHistory } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import Modal from 'react-modal';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [streetWidth, setStreetWidth] = useState(20);
  const location = useLocation();

  // Step 1 state
  const [image, setimage] = useState([]);

  // Step 2 state
  const [numPlanned, setNumPlanned] = useState('');
  const [numPiece, setNumPiece] = useState('');
  const [showPlannedInfo, setShowPlannedInfo] = useState(false);

  // Step 3 state
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  // Step 5 state
  const [AdvertiserName, setAdvertiserName] = useState('');
  const [AdvertiserNum, setAdvertiserNum] = useState('');

  // Step 4 state
  const [Width, setWidth] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [floorNum, setFloorNum] = useState('');
  const [blockNumber, setBlockNumber] = useState('');
  const [furnished, setFurnished] = useState(false);
  const [annex, setAnnex] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [carEntrance, setCarEntrance] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);
  const [waterHeater, setWaterHeater] = useState(false);
  const [electricityAvailability, setElectricityAvailability] = useState(false);
  const [privateRoof, setPrivateRoof] = useState(false);
  const [inVilla, setInVilla] = useState(false);
  const [privateEntrance, setPrivateEntrance] = useState(false);
  const [twoEntrances, setTwoEntrances] = useState(false);
  const [floorNumber, setFloorNumber] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [propertyType, setPropertyType] = useState(''); // Default property type
  const [tokenDecoded, setTokenDecoded] = useState(false);
  const [AdvertiserEmail, setAdvertiserEmail] = useState('');



  const [showSuccessModal, setShowSuccessModal] = useState('');

  useEffect(() => {
    const getAuthToken = localStorage.getItem('token');
    const decodedToken = getAuthToken ? jwtDecode(getAuthToken) : null;
    console.log('Decoded Token:', decodedToken);

    if (decodedToken) {
      // Update the state with the decoded token and setTokenDecoded to true
      setTokenDecoded(true);
      // Now you can access properties from decodedToken, such as userId
      const AdvertiserEmail = decodedToken.email;
      // Set the userId in the state
      setAdvertiserEmail(AdvertiserEmail);
    }
  }, []);
    
  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.type === 'file') {
      const selectedFiles = e.target.files;
      setimage(selectedFiles);
    } else {
      // Handle other form input changes if needed
    }
  };
  const getAuthToken = localStorage.getItem('token');
  const decodedToken = getAuthToken ? jwtDecode(getAuthToken) : null;
  
  // Now you can access properties from decodedToken, such as userId
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }

    // formData.append('image', image);
    formData.append('streetWidth', streetWidth);
    formData.append('AdvertiserNum', AdvertiserNum);
    formData.append('AdvertiserName', AdvertiserName);
    formData.append('propertyType', propertyType);
    formData.append('numPlanned', numPlanned);
    formData.append('roomCount', roomCount);
    formData.append('floorNumber', floorNumber);
    formData.append('twoEntrances', twoEntrances);
    formData.append('privateEntrance', privateEntrance);
    formData.append('inVilla', inVilla);
    formData.append('privateRoof', privateRoof);
    formData.append('electricityAvailability', electricityAvailability);
    formData.append('waterHeater', waterHeater);
    formData.append('airConditioning', airConditioning);
    formData.append('elevator', elevator);
    formData.append('kitchen', kitchen);
    formData.append('annex', annex);
    formData.append('furnished', furnished);
    formData.append('blockNumber', blockNumber);
    formData.append('floorNum', floorNum);
    formData.append('selectedPayment', selectedPayment);
    formData.append('selectedStatus', selectedStatus);
    formData.append('Width', Width);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('showPlannedInfo', showPlannedInfo);
    formData.append('numPiece', numPiece);
    formData.append('AdvertiserEmail', AdvertiserEmail);
    console.log(AdvertiserEmail)

  try {
    const response = await fetch('http://localhost:9000/users/addadvertisement', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken}`,

      },
      body: formData,
    });

    if (response.ok) {
      console.log('Form submitted successfully!');
      setShowSuccessModal(true); // Set the state to show the success modal
      console.log('showSuccessModal value:', showSuccessModal);
       window.location.href = '/';
    
      // Handle redirection here
    } else {
      console.error('Form submission failed.');
      alert('Form not  submitted !');
    }
  } catch (error) {
    console.error('Error submitting the form:', error);
  }
};



const handlePropertyTypeChange = (e) => {
  setPropertyType(e.target.value);
};
  const marks = [
    { value: 0, label: '1م' },
    { value: 5, label: '3م' },
    { value: 10, label: '5م' },
    { value: 15, label: '6م' },
  ];
  const roomMarks = [
    { value: 0, label: '1' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
  ];
  const floorMarks = [
    { value: 0, label: '1' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
  ];

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleStreetWidthChange = (event, newValue) => {
    setStreetWidth(newValue);
  };

  const handleRadioChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handlePaymentRadioChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  function valuetext(value: number | number[]) {
       return `${value}`;
      }

      const renderPropertyTypeForm = () => {
        switch (propertyType) {
          case 'land':
          case 'WarehousesForRent':
          case 'VillasForRent':
          case 'VillasForSale':
          case 'ShopsForRent':
          case 'BuildingsForSale':
          case 'FarmsForSale':
              
              if (step == 2 ) {
                return (
                  <>
                    <h2 className="fs-title">الخطوة الثانية</h2>
                    <h3 className="fs-subtitle">تفاصيل القطعة</h3>
                    <input type="text" name="NumPlanned" placeholder="رقم المخطط" onChange={(e) => setNumPlanned(e.target.value)} />
                    <input type="text" name="NumPiece" placeholder="رقم القطعة" onChange={(e) => setNumPiece(e.target.value)} />
                    <FormControlLabel
                      style={{ textAlign: 'left', marginLeft: '0', width: '100%' }}
                      required
                      control={<Checkbox checked={showPlannedInfo} onChange={() => setShowPlannedInfo(!showPlannedInfo)} />}
                      label="اظهار معلومات المخطط ضمن الاعلان"
                    />
                  </>
                );
              }
              if (step == 3) {
                return (
                  <>
                    <h2 className="fs-title">الحطوة الثالثة</h2>
            <h3 className="fs-subtitle">ادخل تفاصيل الاعلان</h3>
            <input type="text" name="price" placeholder="السعر الاجمالي" onChange={(e) => setPrice(e.target.value)} />
            <textarea type="text" name="description" placeholder="وصف العقار" onChange={(e) => setDescription(e.target.value)} />
                  </>
                );
              }
              if (step == 4) {
                return (
                  <>
                     <h2 className="fs-title">الخطوة الرابعة</h2>
            <h3 className="fs-subtitle">ادخل تفاصيل الاعلان</h3>
            <div className="form-group">
              <label className="slider-label">عرض الشارع: {streetWidth} م</label>
              <input type="number" name="Width" placeholder="عرض الشارع" onChange={(e) => setWidth(e.target.value)} />
  
          
            </div>
           
            <RadioGroup row aria-labelledby="payment-label" name="payment" value={selectedPayment} onChange={handlePaymentRadioChange}>
              <FormControlLabel value="Monthly" control={<Radio />} label="يومي" />
              <FormControlLabel value="daily" control={<Radio />} label="شهري" />
              <FormControlLabel value="annual" control={<Radio />} label="سنوي" />
            </RadioGroup>
            <div className="form-group">
              <label className="slider-label"> العرض: {streetWidth} م</label>
              <Slider
                aria-label="Custom marks"
                
                value={streetWidth}
                onChange={handleStreetWidthChange}
                getAriaValueText={(value) => `${value}م`}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                style={{ color: '#008d6a' }} 
             
              />
            </div>
           
            <input type="number" name="FloorNum" placeholder="رقم الدور" onChange={(e) => setFloorNum(e.target.value)} />
            <input type="number" name="BlockNumber" placeholder="رقم العقار" onChange={(e) => setBlockNumber(e.target.value)} />
  

            <div className="radio-container">
        <FormControlLabel
          value="Annex"
          control={<Radio />}
          label="ملحق"
          onChange={() => setAnnex(!annex)}
        />
      </div>
      <hr />
          
    
      <div className="radio-container">
        <FormControlLabel
          value="WaterHeater"
          control={<Radio />}
          label="توفر مياه "
          onChange={() => setWaterHeater(!waterHeater)}
        />
      </div>
      <hr />
      <div className="radio-container">
        <FormControlLabel
          value="ElectricityAvailability"
          control={<Radio />}
          label="توفر الكهرباء "
          onChange={() => setElectricityAvailability(!electricityAvailability)}
        />
      </div>
      <hr />
    
  
      <div className="radio-container">
        <FormControlLabel
          value="PrivateEntrance"
          control={<Radio />}
          label=" مدخل خاص  "
          onChange={() => setPrivateEntrance(!privateEntrance)}
        />
      </div>
      <hr />
      <div className="radio-container">
        <FormControlLabel
          value="TwoEntrances"
          control={<Radio />}
          label="  مدخلين  "
          onChange={() => setTwoEntrances(!twoEntrances)}
        />
      </div>
      <hr />
      
  
      <div className="form-group">
        <label className="slider-label">الطابق: {floorNumber}</label>
        <Slider
          aria-label="Custom marks"
          value={floorNumber}
          onChange={(event, newValue) => setFloorNumber(newValue)}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="15"
          marks={floorMarks}
          max={15} // Set the maximum value to 15
          style={{ color: '#008d6a' }} 

        />
        </div>
                  </>
                );
              }
         
         
          case 'apartment':
         
            case 'ApartmentsForSale':
            case 'FurnishedApartments':

            if (step == 2 ) {
              return (
                <>
                  <h2 className="fs-title">الخطوة الثانية</h2>
                  <h3 className="fs-subtitle">تفاصيل القطعة</h3>
                  <input type="text" name="NumPlanned" placeholder="رقم المخطط" onChange={(e) => setNumPlanned(e.target.value)} />
                  <input type="text" name="NumPiece" placeholder="رقم القطعة" onChange={(e) => setNumPiece(e.target.value)} />
                  <FormControlLabel
                    style={{ textAlign: 'left', marginLeft: '0', width: '100%' }}
                    required
                    control={<Checkbox checked={showPlannedInfo} onChange={() => setShowPlannedInfo(!showPlannedInfo)} />}
                    label="اظهار معلومات المخطط ضمن الاعلان"
                  />
                </>
              );
            }
            if (step == 3) {
              return (
                <>
                  <h2 className="fs-title">الحطوة الثالثة</h2>
          <h3 className="fs-subtitle">ادخل تفاصيل الاعلان</h3>
          <input type="text" name="price" placeholder="السعر الاجمالي" onChange={(e) => setPrice(e.target.value)} />
          <textarea type="text" name="description" placeholder="وصف العقار" onChange={(e) => setDescription(e.target.value)} />
                </>
              );
            }
            if (step == 5) {
              return (
                <>
                  <h2 className="fs-title">الحطوة الخامسة</h2>
          <h3 className="fs-subtitle">ادخل تفاصيل المعلن</h3>
          <input type="text" name="AdvertiserName" placeholder="اسم الملعن " onChange={(e) => setAdvertiserName(e.target.value)} />
          <textarea type="text" name="AdvertiserNum" placeholder="رقم المعلن " onChange={(e) => setAdvertiserNum(e.target.value)} />
                </>
              );
            }
            if (step == 4) {
              return (
                <>
                   <h2 className="fs-title">الخطوة الرابعة</h2>
          <h3 className="fs-subtitle">ادخل تفاصيل الاعلان</h3>
          <div className="form-group">
            <label className="slider-label">عرض الشارع: {streetWidth} م</label>
            <input type="number" name="Width" placeholder="عرض الشارع" onChange={(e) => setWidth(e.target.value)} />

            {/* <Slider

              aria-label="Custom marks"
              value={streetWidth}
              onChange={handleStreetWidthChange}
              getAriaValueText={(value) => `${value}م`}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
            /> */}
          </div>
          <RadioGroup row aria-labelledby="status-label" name="status" value={selectedStatus} onChange={handleRadioChange}>
            <FormControlLabel value="single" control={<Radio />} label="عزاب" />
            <FormControlLabel value="married" control={<Radio />} label="عوائل" />
          </RadioGroup>
          <RadioGroup row aria-labelledby="payment-label" name="payment" value={selectedPayment} onChange={handlePaymentRadioChange}>
            <FormControlLabel value="Monthly" control={<Radio />} label="يومي" />
            <FormControlLabel value="daily" control={<Radio />} label="شهري" />
            <FormControlLabel value="annual" control={<Radio />} label="سنوي" />
          </RadioGroup>
          <div className="form-group">
            <label className="slider-label">عرض الصالات: {streetWidth} م</label>
            <Slider
              aria-label="Custom marks"
              value={streetWidth}
              onChange={handleStreetWidthChange}
              getAriaValueText={(value) => `${value}م`}
              step={10}
              valueLabelDisplay="auto"
              marks={floorMarks}
              max={15} // Set the maximum value to 15
              style={{ color: '#008d6a' }} 

            />
          </div>
          <div className="form-group">
            <label className="slider-label">دورات المياه: {streetWidth} م</label>
            <Slider
              aria-label="Custom marks"
              value={streetWidth}
              onChange={handleStreetWidthChange}
              getAriaValueText={(value) => `${value}م`}
              step={10}
              valueLabelDisplay="auto"
              marks={floorMarks}
              max={15} // Set the maximum value to 15
              style={{ color: '#008d6a' }} 

            />
          </div>
          <input type="number" name="FloorNum" placeholder="رقم الدور" onChange={(e) => setFloorNum(e.target.value)} />
          <input type="number" name="BlockNumber" placeholder="رقم العقار" onChange={(e) => setBlockNumber(e.target.value)} />

          <div className="radio-container">
            <FormControlLabel
              value="Furnished"
              control={<Radio />}
              label="مؤثثة"
              onChange={() => setFurnished(!furnished)}
            />
          </div>
          <hr/>
          <div className="radio-container">
      <FormControlLabel
        value="Annex"
        control={<Radio />}
        label="ملحق"
        onChange={() => setAnnex(!annex)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="Kitchen"
        control={<Radio />}
        label="مطبخ"
        onChange={() => setKitchen(!kitchen)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="CarEntrance"
        control={<Radio />}
        label="مدخل سيارات"
        onChange={() => setCarEntrance(!carEntrance)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="Elevator"
        control={<Radio />}
        label="مصعد "
        onChange={() => setElevator(!elevator)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="AirConditioning"
        control={<Radio />}
        label="مكيفات "
        onChange={() => setAirConditioning(!airConditioning)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="WaterHeater"
        control={<Radio />}
        label="توفر مياه "
        onChange={() => setWaterHeater(!waterHeater)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="ElectricityAvailability"
        control={<Radio />}
        label="توفر الكهرباء "
        onChange={() => setElectricityAvailability(!electricityAvailability)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="PrivateRoof"
        control={<Radio />}
        label="سطح خاص  "
        onChange={() => setPrivateRoof(!privateRoof)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="InVilla"
        control={<Radio />}
        label="في فيلا  "
        onChange={() => setInVilla(!inVilla)}
      />
    </div>
    <hr />

    <div className="radio-container">
      <FormControlLabel
        value="PrivateEntrance"
        control={<Radio />}
        label=" مدخل خاص  "
        onChange={() => setPrivateEntrance(!privateEntrance)}
      />
    </div>
    <hr />
    <div className="radio-container">
      <FormControlLabel
        value="TwoEntrances"
        control={<Radio />}
        label="  مدخلين  "
        onChange={() => setTwoEntrances(!twoEntrances)}
      />
    </div>
    <hr />
    <div className="form-group">
      <label className="slider-label"  >عدد الغرف:  {roomCount}</label>
      <Slider
        aria-label="Custom marks"
        value={roomCount}
        onChange={(event, newValue) => setRoomCount(newValue)}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={roomMarks}
        max={15} // Set the maximum value to 15
        style={{ color: '#008d6a' }} 

      />
    </div>

    <div className="form-group">
      <label className="slider-label">الطابق: {floorNumber}</label>
      <Slider
        aria-label="Custom marks"
        value={floorNumber}
        onChange={(event, newValue) => setFloorNumber(newValue)}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={floorMarks}
        max={15} // Set the maximum value to 15
        style={{ color: '#008d6a' }} 

      />
      </div>
                </>
              );
            }
       
      
               
             
          // Add cases for other property types
          default:
            return null;
        }
      };
  return (


    
    <div id="msform" >
<form onSubmit={handleSubmit} >

      {step === 1 && (
        <fieldset>
          <h2 className="fs-title">إرفاق صور</h2>
          <h3 className="fs-subtitle">الخطوة الأولى</h3>
          <Form.Group controlId="formGridFile" className="col col-sm-6">
            <Form.Label>إرفاق صورة</Form.Label>
            <Form.Control type="file" name="image" onChange={(e) => setimage(e.target.files)} multiple />
          </Form.Group>
          <Form.Group id="propertyType">
  <Form.Label>نوع العقار</Form.Label>
  <Form.Control as="select" value={propertyType} name="propertyType" onChange={(e) => setPropertyType(e.target.value)} >
  <option value="ApartmentsForSale">شقة للبيع</option>
  <option value="land">أرض للبيع</option>
  <option value="apartment">شقة للايجار </option>
  <option value="FurnishedApartments">شقة مفروشة</option>
  <option value="WarehousesForRent">مستودع للإيجار</option>
  <option value="VillasForRent">استراحة للإيجار</option>
  <option value="FarmsForSale">مزرعة للبيع</option>
  <option value="VillasForSale">استراحة للبيع</option>
  <option value="ShopsForRent">محلات للإيجار</option>
  <option value="BuildingsForSale">عمائر للبيع</option>
              </Form.Control>
            </Form.Group>

          <input type="button" name="next" className="next action-button" value="التالي" onClick={handleNext} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
                      {renderPropertyTypeForm()}

          {/* <FormControlLabel
            style={{ textAlign: 'left', marginLeft: '0', width: '100%' }}
            required
            control={<Checkbox checked={showPlannedInfo} onChange={() => setShowPlannedInfo(!showPlannedInfo)} />}
            label="اظهار معلومات المخطط ضمن الاعلان"
          /> */}
          <input type="button" name="previous" className="previous action-button" value="السابق" onClick={handlePrevious} />
          <input type="button" name="next" className="next action-button" value="التالي" onClick={handleNext} />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
                   {renderPropertyTypeForm()}

          <input type="button" name="previous" className="previous action-button" value="السابق" onClick={handlePrevious} />
          <input type="button" name="next" className="next action-button" value="التالي" onClick={handleNext} />
        </fieldset>
      )}
      {step === 4 && (
        <fieldset>
                   {renderPropertyTypeForm()}

          <input type="button" name="previous" className="previous action-button" value="السابق" onClick={handlePrevious} />
          <input type="button" name="next" className="next action-button" value="التالي" onClick={handleNext} />
        </fieldset>
      )}

      {step === 5 && (
        <fieldset>
          {renderPropertyTypeForm()}
         
    
          <input type="button" name="previous" className="previous action-button" value="السابق" onClick={handlePrevious} />
          <button type="submit" className="submit action-button">
  نشر الأعلان
</button>          {/* <a href="https://twitter.com/GoktepeAtakan" className="submit action-button" target="_top" onSubmit={handleSubmit}>
            Submit
          </a> */}
        </fieldset>
      )}
         {/* Step 6: Success Modal */}
{showSuccessModal && (
  <Modal show={true} onHide={() => setShowSuccessModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>تم نشر الإعلان بنجاح!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      شكرًا لنشر الإعلان. يمكنك مشاهدة الإعلان الخاص بك على الصفحة الرئيسية.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
        إغلاق
      </Button> 
    </Modal.Footer>
  </Modal>
)}

      </form>
     
    </div>
    
  );
};

export default MultiStepForm;

