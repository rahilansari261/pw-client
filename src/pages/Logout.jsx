import styled from "styled-components";

export const Logout = () => {
  window.location.href = "/login";
  localStorage.setItem("token", "");
  return <Main>You are logging out...</Main>;
};

const Main = styled.div`
  margin: 2em;
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 1em;
`;
