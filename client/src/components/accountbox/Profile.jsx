import React, { useState, useEffect } from 'react';
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
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [userAdvertisements, setUserAdvertisements] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  useEffect(() => {
    fetchUserAdvertisements();
  }, []);

  const fetchUserAdvertisements = async () => {
    try {
      const response = await fetch('http://localhost:9000/users/allAdvertisementu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserAdvertisements(data);
        const decodedToken = jwtDecode(localStorage.getItem('token'));
        setUserEmail(decodedToken.email);
        setUserName(decodedToken.name);
      } else {
        console.error('Failed to fetch user advertisements');
      }
    } catch (error) {
      console.error('Error fetching user advertisements:', error);
    }
  };

  const handleShowNumber = async () => {
    try {
      const response = await fetch('http://localhost:9000/users/allAdvertisementu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserNumber(data.number);
      } else {
        console.error('Failed to fetch user number');
      }
    } catch (error) {
      console.error('Error fetching user number:', error);
    }
  };

  const handleDeleteAdvertisement = async (advertisementId) => {
    try {
      const response = await fetch(`http://localhost:9000/users/deleteAdvertisement/${advertisementId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Update the userAdvertisements state after successful deletion
        const updatedAdvertisements = userAdvertisements.filter(ad => ad._id !== advertisementId);
        setUserAdvertisements(updatedAdvertisements);
      } else {
        console.error('Failed to delete advertisement');
      }
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee', width: '100%' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="18">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-black-6-512.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '190px' }}
                  fluid
                />
                <br />
                <br />
                <p className="text-muted mb-1">{userName}</p>
                <p className="text-muted mb-1">{userEmail}</p>
                <p className="text-muted mb-1">{userNumber}</p>
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={handleShowNumber} style={{ backgroundColor: '#008d6a', borderColor: '#008d6a' }}>
                    اظهار الرقم
                  </MDBBtn>
                  {/* <MDBBtn outline className="ms-2 ">
                    مراسلة
                  </MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>

            {/* Display user advertisements */}
            <MDBCard className="mb-4 mb-lg-8">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {userAdvertisements.map((advertisement) => (
                    <MDBListGroupItem
                      key={advertisement._id} // Assuming you have a unique identifier for each advertisement
                      className="d-flex justify-content-between align-items-center p-3"
                    >
                      <MDBCardText>{advertisement.description}</MDBCardText>
                      <MDBIcon
                        fas
                        icon="trash-alt fa-lg text-danger"
                        onClick={() => handleDeleteAdvertisement(advertisement._id)}
                        style={{ cursor: 'pointer' }}
                      />                    </MDBListGroupItem>
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
