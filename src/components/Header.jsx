import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose, faHamburger, faNavicon, faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
export const Header = (props) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {    
    props.handleNav(!isActive);
    setIsActive(!isActive);
  };
  return (
    <TopHeader>
      <NavIcon onClick={handleClick}>
        <FontAwesomeIcon icon={faNavicon} />
      </NavIcon>

      <UserWrapper>
        <UserName>Rahil Ansari</UserName>
        <FontAwesomeIcon icon={faUser} />
      </UserWrapper>
    </TopHeader>
  );
};

const TopHeader = styled.header`
  background-color: var(--primary-color);
  color: white;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: var(--header-bs);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  @media (max-width: 550px) {
    position: fixed;
  }
`;
const NavIcon = styled.div`
  padding-left: 32px;
  font-size: 2rem;
  opacity: 0;
  @media (max-width: 550px) {
    opacity: 1;
    padding-left: 16px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: end;
  align-items: center;
  gap: 16px;
  @media (max-width: 550px) {
    padding-right: 16px;
  }
`;
const UserName = styled.div`
  padding-right: 1em 0;
`;
