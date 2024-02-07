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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const history = useHistory();  // Initialize useHistory

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
      alert("Login successful");
      window.location.href='/home'

      
    } else {
      alert("Please check your username or password");
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
