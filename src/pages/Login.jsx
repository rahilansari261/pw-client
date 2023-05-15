import React from "react";
import { useState } from "react";
import styled from "styled-components";

export const Login = () => {
  const [user_email, setUsername] = useState("subayan@roaring.com");
  const [user_password, setPassword] = useState("subayan@123");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://pw-backend.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email, user_password }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        window.location.href = '/';
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <LoginWrapper>
      <FormWrapper onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            placeholder="Username"
            value={user_email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Login</Button>
      </FormWrapper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  height: 100vh;
  background: linear-gradient(
    300deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
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
