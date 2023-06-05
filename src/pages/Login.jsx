import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { LineWave, ColorRing } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/authSlice";
import { setUser } from "../reducers/userSlice";
import useFetch from "../hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const [user_email, setUsername] = useState("rahil@lilbit.io");
  const [user_password, setPassword] = useState("Rahil123");
  const [showRingLoader, setShowRingLoader] = useState(false);
  const [isMessage, setMessage] = useState(false);

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { data, isLoading, error, loginUser } = useFetch();

  const handleLogin = async (e) => {
    setShowRingLoader(true);
    e.preventDefault();
    setTimeout(() => {
      setMessage(true);
    }, 3000);

    await toast.promise(loginUser({ user_email, user_password }), {
      loading: "Loading",
      success: "Sucessfully signed in.",
      error: "Error when sign in.",
    });
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(login());
      dispatch(setUser({ ...data.data, token: data.token }));
    }
  }, [data, error, isLoading]);
  console.log(isLoading);
  return (
    <LoginWrapper>
      {showRingLoader ? (
        <RingWithMessage>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            // colors={["#0069D9", "#218838", "#C82333", "#E0A800", "#138496"]}
          />
          {isMessage && (
            <Message>
              Please wait ⌛. <br /> We're using free services: <br />
              🌐 Frontend: Netlify, <br />
              🗄️ Database: MongoDB Atlas, <br />
              🔌 APIs: Render. <br />
              Thank you for your patience! 🚀✨
            </Message>
          )}
        </RingWithMessage>
      ) : (
        <FormWrapper onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <Input type="text" placeholder="Username" value={user_email} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input type="password" placeholder="Password" value={user_password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button type="submit">Login</Button>
        </FormWrapper>
      )}
      <Toaster />
    </LoginWrapper>
  );
};
const RingWithMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Message = styled.p`
  color: #fff;
  font-size: 0.75rem;
  max-width: 200px;
`;
const LoginWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(300deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  background-color: var(--table-border-color);
  padding: 32px;
`;

const Input = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  flex: 2;
`;

const Button = styled.button`
  width: 100%;
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: pointer;
  text-align: center;
  background-color: #0069d9;
  border-radius: 4px;
  border: none;
`;
