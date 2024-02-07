import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row, Button, ProgressBar } from 'react-bootstrap';

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    a_state: '',
    pin: '',
    menu: '',
    order: '',
    images: [],
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const selectedFiles = Array.from(e.target.files);
      setForm({ ...form, images: selectedFiles });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // Add your logic for handling the final form submission
  };

  const handleReset = () => {
    setForm({
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      a_state: '',
      pin: '',
      menu: '',
      order: '',
      images: [],
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitButton = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
    } else {
      handleSubmit(e);
    }
  };

  const resetButton = () => {
    setCurrentStep(1);
    handleReset();
  };

  const calculateProgress = () => {
    return (currentStep - 1) * 50; // Assuming each step contributes 50% to the progress
  };

  return (
    <div className="container mt-3 mb-3">
      <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
      <form>
        {currentStep === 1 && (
          // Step 1
          <div>
            <Row className="mb-3">
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="name" name="first_name" value={form.first_name} onChange={handleChange} className="form-control" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="name" name="last_name" value={form.last_name} onChange={handleChange} className="form-control" />
              </Form.Group>
            </Row>
            {/* ... other form fields for step 1 */}
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          // Step 2
          <div>
            <Row className="mb-3">
              <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                <Form.Label>Mobile Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                  <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={form.mobile} onChange={handleChange} />
                </InputGroup>
              </Form.Group>
              {/* ... other form fields for step 2 */}
            </Row>
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          // Step 3
          <div>
            <Row className="mb-3">
              <Form.Group controlId="formGridFile" className="col col-sm-6">
                <Form.Label>Upload Images</Form.Label>
                <Form.Control type="file" name="images" onChange={handleChange} multiple />
              </Form.Group>
              {/* ... other form fields for step 3 */}
            </Row>
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
            <Button variant="success" onClick={submitButton}>
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
