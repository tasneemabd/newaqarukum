import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorBox, setShowErrorBox] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessBox, setShowSuccessBox] = useState(false);  // New state for success message
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message
  const history = useHistory();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:9000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.user) {
      localStorage.setItem('token', data.user);
      setSuccessMessage("Login successful!");  // Set success message
      setShowSuccessBox(true);  // Display success box
      setShowErrorBox(false);  // Hide error box
      history.push('/');  // Use history.push instead of window.location.href
    } else {
      setErrorMessage("Please check your username or password");
      setShowErrorBox(true);
      setShowSuccessBox(false);  // Hide success box
    }
  }


  return (
    <BoxContainer>
      <FormContainer onSubmit={loginUser}>
        <Input
          type="email"
          placeholder="البريد الالكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="الرقم السري "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">  هل نسيت الرقم السري؟</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">تسجيل دخول</SubmitButton>

        {/* Conditionally render the error box */}
        {showErrorBox && (
          <div style={{ border: '1px solid red', padding: '10px', margin: '10px', borderRadius: '5px', color: 'red' }}>
            {errorMessage}
          </div>
        )}
           {showSuccessBox && (
          <div style={{ border: '1px solid green', padding: '10px', margin: '10px', borderRadius: '5px', color: 'green' }}>
            {successMessage}
          </div>
        )}
      </FormContainer>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        ليس لديك حساب؟{" "}
        <BoldLink onClick={switchToSignup} href="#">
          انشاء حساب
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
