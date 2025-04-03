
import { useState, useEffect } from "react";
import { signup } from "../../store/auth-slice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import AuthSide from "../reusable/AuthSide";
import toast, { Toaster } from 'react-hot-toast';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLName] = useState("");
  const [firstName, setFName] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationHandler = async () => {
    event.preventDefault();
    toast('Signing you up.');

    const data = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      password_confirmation: passwordConf,
    };
    dispatch(signup(data))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/my-portfolio");
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError)
      });
  };


  return (
    <div className="h-screen flex bg-gray-400 items-center justify-center">
      <Toaster/>
      <div className="w-4/5 sm:w-4/5 md:w-2/5">
        <form
          onSubmit={registrationHandler}
          className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
        <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Signup
        </p>
        <FormInput
          inputLabel="First Name"
          labelFor="firstName"
          inputType="firstName"
          inputId="firstName"
          inputName="firstName"
          placeholderText="Your first name"
          ariaLabelName="firstName"
          value={firstName}
          onChange={(e) => setFName(e.target.value)}
        />
        <FormInput
          inputLabel="Last Name"
          labelFor="lastName"
          inputType="lastName"
          inputId="lastName"
          inputName="lastName"
          placeholderText="Your last name"
          ariaLabelName="lastName"
          value={lastName}
          onChange={(e) => setLName(e.target.value)}
        />
        <FormInput
          inputLabel="Email"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputName="email"
          placeholderText="Your email"
          ariaLabelName="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          inputLabel="Password"
          labelFor="password"
          inputType="password"
          inputId="password"
          inputName="password"
          placeholderText="Enter a password"
          ariaLabelName="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          inputLabel="confirm Password"
          labelFor="confirm password"
          inputType="password"
          inputId="confirm password"
          inputName="confirm password"
          placeholderText="Confirm password"
          ariaLabelName="Confirm Password"
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
        />

        <Button
          title="Signup"
          type="submit"
          aria-label="Signup"
        />
      </form>
    </div>
    <AuthSide link="/login"/>
  </div>
  );
}

export default Registration;
