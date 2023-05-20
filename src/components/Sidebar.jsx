import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Pallete from "../util/Constant";
import FAQpdf from "../assets/FAQ.pdf";
import { faGem, faChartLine, faUsers, faBagShopping, faGears, faArrowRightFromBracket, faFileInvoiceDollar, faFileInvoice, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

let openMenu;
export const Sidebar = (props) => {
  openMenu = props.open;
  const listItems = [
    {
      id: "1",
      title: "Dashboard",
      link: "/",
      icon: <FontAwesomeIcon icon={faChartLine} />,
    },

    {
      id: "2",
      title: "Products",
      link: "/products",
      icon: <FontAwesomeIcon icon={faBagShopping} />,
    },
    {
      id: "3",
      title: "Clients",
      link: "/clients",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },

    {
      id: "4",
      title: "Invoices",
      link: "/invoices",
      icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    },
    {
      id: "5",
      title: "Accounts",
      link: "/accounts",
      icon: <FontAwesomeIcon icon={faFileInvoice} />,
    },

    {
      id: "6",
      title: "Settings",
      link: "/settings",
      icon: <FontAwesomeIcon icon={faGears} />,
    },
    // {
    //   id: "7",
    //   title: "Need help",
    //   link: "/needhelp",
    //   icon: <FontAwesomeIcon icon={faInfoCircle} />,
    // },
    // {
    //   id: "8",
    //   title: "Logout",
    //   link: "/logout",
    //   icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    // },
  ];
  const [isLogout, setLogout] = useState(false);
  const handleLogout = () => {
    setLogout(true);
    localStorage.setItem("token", "");
    window.location.reload();
  };
  return (
    <Aside>
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
                  style={{
                    backgroundColor: item.link === props.title && !isLogout ? Pallete.secondaryColor : "initial",
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
              style={{
                backgroundColor: props.title === "/needhelp" && !isLogout ? Pallete.secondaryColor : "initial",
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
              backgroundColor: isLogout ? Pallete.secondaryColor : "initial",
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
  position: fixed;
  top: 0;
  left:0;
  z-index: 1;
  box-shadow: var(--sidebar-bs);
  @media (max-width: 550px) {
    position: absolute;
    transform: ${(props) => (openMenu ? "translateX(0%)" : "translateX(-100%)")};
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
