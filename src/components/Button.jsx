import styled from 'styled-components'
const buttonColor = {
  primary: '#0069D9',
  secondary: '#5A6268',
  success: '#218838',
  danger: '#C82333',
  warning: '#E0A800',
  info: ' #13849',
}
let colorCode = ''
export const Button = (props) => {
  colorCode = props.label
  return <Btn>{props.children}</Btn>
}

const Btn = styled.div`
  font-size: 12px;
  color: var(--white-color);
  padding 0.65em;
  border-radius:4px;
  cursor:pointer;
  background-color:${(props) => buttonColor[colorCode]};
  
`
