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
export const Badge = (props) => {
  colorCode = props.label

  return <Btn>{props.children}</Btn>
}

const Btn = styled.div`
  font-size: 10px;
  color: var(--white-color);
  text-align: center;
  background-color: ${(props) => buttonColor[colorCode]};
  border-radius: 8px;
  text-transform: uppercase;
`
