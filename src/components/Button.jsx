import styled from "styled-components";
const buttonColor = {
  primary: "#0069D9",
  secondary: "#5A6268",
  success: "#218838",
  danger: "#C82333",
  warning: "#E0A800",
  info: "#138496",
};
let colorCode = "";
let btnWidth = "";
export const Button = (props) => {
  btnWidth = props.width ? props.width : "fit-content";
  colorCode = props.label;
  const param = props.params;
  const clickHandle2 = () => {
    param !== "" ? props.clickHandle(param) : props.clickHandle();
  };
  return <Btn onClick={clickHandle2}>{props.children}</Btn>;
};

const Btn = styled.button`
  width: ${(props) => btnWidth};
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => buttonColor[colorCode]};
  border-radius: 4px;
  border: none;
`;
