import { useState } from "react";
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth-slice"
import AuthSide from "../reusable/AuthSide";
import toast, { Toaster } from 'react-hot-toast';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast('Verifying your credentials.');

    dispatch(login({ email: email, password: password }))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/my-portfolio");
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError)
      });
  };

	return (
		<div className="h-screen bg-gray-400 flex items-center justify-center">
      <Toaster/>
      <div className="w-4/5 sm:w-4/5 md:w-2/5">
				<form
					onSubmit={handleSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Login
					</p>
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
            placeholderText="Your password"
            ariaLabelName="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            title="Login"
            type="submit"
            aria-label="Login"
          />
				</form>
			</div>
      <AuthSide link="/signup"/>
		</div>
	);
};

export default Auth;
