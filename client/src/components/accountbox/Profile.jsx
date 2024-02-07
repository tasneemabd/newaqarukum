import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
} from 'mdb-react-ui-kit';

const Profile = () => {
  const [userAdvertisements, setUserAdvertisements] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user advertisements when the component mounts
    fetchUserAdvertisements();
  }, []);

  const fetchUserAdvertisements = async () => {
    try {
      // Make a fetch request to your server endpoint to get user advertisements
      const response = await fetch('http://localhost:9000/users/allAdvertisementu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {
        const data = await response.json();
        console.log('Advertisement data:', data);
        setUserAdvertisements(data);
        const decodedToken = jwtDecode(localStorage.getItem('token'));
        setUserEmail(decodedToken.email);
      } else {
        console.error('Failed to fetch user advertisements');
      }
    } catch (error) {
      console.error('Error fetching user advertisements:', error);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee', width: '100%' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="18">
            {/* Your existing profile card */}
            <p>User Email: {userEmail}</p>

            {/* Display user advertisements */}
            <MDBCard className="mb-4 mb-lg-8">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {userAdvertisements.map((advertisement) => (
                    <MDBListGroupItem
                      key={advertisement._id}
                      className="d-flex justify-content-between align-items-center p-3"
                    >
                      <MDBCardText>{advertisement.description}</MDBCardText>
                      <MDBIcon fas icon="trash-alt fa-lg text-danger" />
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
