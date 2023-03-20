import * as Icon from 'react-feather'
import styled from 'styled-components'
export const Header = () => {
  return (
    <TopHeader>
      <UserWrapper>
        <UserName>Rahil Ansari</UserName>
        <Icon.User />
      </UserWrapper>
    </TopHeader>
  )
}

const TopHeader = styled.header`
  background-color: var(--primary-color);
  color: white;
  align-items: center;
  position: sticky;
  top: 0;
  box-shadow: var(--header-bs);
`
const UserWrapper = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: end;
  gap 16px;
`
const UserName = styled.div`
  padding-right: 1em 0;
`
