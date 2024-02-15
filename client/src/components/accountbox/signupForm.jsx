import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";  // Import useHistory from react-router-dom
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./comman";
import { Marginer } from "../marginer";
import { AccountContext } from './AccountContext';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const history = useHistory();  // Initialize useHistory 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  
  // async function registerUser(e) {
  //   e.preventDefault();
  //   const response = await fetch('http://localhost:9000/users/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }, 
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log(data);
  //   if(data.status==='ok'){
    
  //     alert("Register successfully")
  //     window.location.href='/'

      
  //   }else{
  //     alert("Please check your Register")

  //   }
  // }
  async function registerUser(e) {
    e.preventDefault();
  
    // Validate if name, email, password, and phoneNumber are not empty
    if (!name || !email || !password ) {
      alert("Please fill in all fields");
      return;
    }
  
    const response = await fetch('http://localhost:9000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  
    const data = await response.json();
    console.log(data);
  
    if (data.status === 'ok') {
      // Alert the user that an OTP has been sent
      alert("Register successfully. Check your phone for OTP.");
  
      // Redirect the user to the OTP verification page
      history.push(`/account`);
    } else {
      alert("Please check your Register");
    }
  }
  
  return (
    <BoxContainer>
      <FormContainer onSubmit={registerUser}>
        <Input
          type="text"
          placeholder="الاسم الكامل "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="البريد الالكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          value={password}
          placeholder="الرقم السري"
          onChange={(e) => setPassword(e.target.value)}
        />



        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit" onSubmit={registerUser}>Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        لديك حساب ؟{" "}
        <BoldLink onClick={switchToSignin} href="#">
          تسجيل دخول
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
