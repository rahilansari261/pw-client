import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Pallete from "../util/Constant";
import FAQpdf from "../assets/FAQ.pdf";
import { faGem, faChartLine, faUsers, faBagShopping, faGears, faArrowRightFromBracket, faFileInvoiceDollar, faFileInvoice, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice";
import { close, open } from "../reducers/drawerSlice";
import { sbwidth } from "../reducers/sidebarwidthSlice";
import listItems from "../util/sidebarList";
let isOpen;
export const Sidebar = (props) => {
  isOpen = useSelector((state) => state.drawer.isOpen);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const calculateSidebarWidth = () => {
      if (sidebarRef.current) {
        const widthX = sidebarRef.current.offsetWidth;
        dispatch(sbwidth(widthX));
      }
    };
    calculateSidebarWidth();
    // dont need these two lines below as of now since Sidebar width if fixed but we'll keep it.
    window.addEventListener("resize", calculateSidebarWidth);
    return () => window.removeEventListener("resize", calculateSidebarWidth);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNav2 = () => {
    isOpen ? dispatch(close()) : dispatch(open());
  };
  return (
    <Aside ref={sidebarRef}>
      <nav>
        <UnOrderedList>
          <Link to="/">
            <LiFlexItemLogo>
              <LogoWrapper>
                <FontAwesomeIcon icon={faGem} />
              </LogoWrapper>
              <div>Paperweight</div>
            </LiFlexItemLogo>
          </Link>
          {listItems.map((item) => {
            return (
              <Link to={item.link} key={item.id}>
                <LiFlexItem
                  onClick={handleNav2}
                  style={{
                    backgroundColor: item.link === props.title ? Pallete.secondaryColor : "initial",
                  }}
                >
                  <div>{item.title}</div>
                  <div>{item.icon}</div>
                </LiFlexItem>
              </Link>
            );
          })}
          <Link to={FAQpdf} target="_blank">
            <LiFlexItem
              onClick={handleNav2}
              style={{
                backgroundColor: props.title === "/needhelp" ? Pallete.secondaryColor : "initial",
              }}
            >
              <div>Need Help</div>
              <div>
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
            </LiFlexItem>
          </Link>
          <LiFlexItem
            onClick={handleLogout}
            style={{
              backgroundColor: !loggedIn ? Pallete.secondaryColor : "initial",
            }}
          >
            <div>Logout</div>
            <div>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
          </LiFlexItem>
        </UnOrderedList>
      </nav>
    </Aside>
  );
};
const Aside = styled.aside`
  flex: 1;
  height: 100vh;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  box-shadow: var(--sidebar-bs);
  @media (max-width: 550px) {
    position: fixed;
    transform: ${(props) => (isOpen ? "translateX(0%)" : "translateX(-100%)")};
    transition: transform 250ms;
  }
`;
const LogoWrapper = styled.div`
  font-size: 2rem;
`;
const UnOrderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: white;
`;
const LiFlexItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0.75em 1em;
  border-bottom: 2px solid var(--primary-color-border);
  cursor: pointer;
  box-shadow: var(--sidebar-bs);
`;
const LiFlexItemLogo = styled(LiFlexItem)`
  justify-content: start;
  gap: 12px;
  padding: 8px 16px;
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  border-bottom: 1px solid black;
`;
