import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { LineWave, ColorRing } from "react-loader-spinner";

export const Login = () => {
  const [user_email, setUsername] = useState("subayan@roaring.com");
  const [user_password, setPassword] = useState("subayan@123");
  const [isLoading, setisLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await fetch("https://pw-backend.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email, user_password }),
      });

      if (response.ok) {
        const { token, data } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("docs", JSON.stringify(data));
        window.location.href = "/";
        // setisLoading(false);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <LoginWrapper>
      {isLoading ? (
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
    </LoginWrapper>
  );
};

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
