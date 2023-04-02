import styled from 'styled-components'
const buttonColor = {
  primary: '#0069D9',
  secondary: '#5A6268',
  success: '#218838',
  danger: '#C82333',
  warning: '#E0A800',
  info: '#138496',
}
let colorCode = ''
export const Button = (props) => {
  colorCode = props.label
  const clickHandle2 = () => {
    props.clickHandle()
  }
  return <Btn onClick={clickHandle2}>{props.children}</Btn>
}

const Btn = styled.div`
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => buttonColor[colorCode]};
  border-radius: 4px;
`
