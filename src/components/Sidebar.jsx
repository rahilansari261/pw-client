import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGem,
  faChartLine,
  faUsers,
  faBagShopping,
  faReceipt,
  faGears,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
export const Sidebar = () => {
  return (
    <Aside>
      <nav>
        <UnOrderedList>
          <Link to='/'>
            <LiFlexItemLogo>
              <LogoWrapper>
                <FontAwesomeIcon icon={faGem} />
              </LogoWrapper>
              <div>Paperweight</div>
            </LiFlexItemLogo>
          </Link>
          <Link to='/'>
            <LiFlexItem>
              <div>Dashboard</div>
              <div>
                <FontAwesomeIcon icon={faChartLine} />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/clients'>
            <LiFlexItem>
              <div>Clients</div>
              <div>
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/products'>
            <LiFlexItem>
              <div>Products</div>
              <div>
                <FontAwesomeIcon icon={faBagShopping} />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/invoices'>
            <LiFlexItem>
              <div>Invoices</div>
              <div>
                <FontAwesomeIcon icon={faReceipt} />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/settings'>
            <LiFlexItem>
              <div>Settings</div>
              <div>
                <FontAwesomeIcon icon={faGears} />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/logout'>
            <LiFlexItem>
              <div>Logout</div>
              <div>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
            </LiFlexItem>
          </Link>
        </UnOrderedList>
      </nav>
    </Aside>
  )
}
const Aside = styled.aside`
  flex: 1;
  height: 100vh;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;
  box-shadow: var(--sidebar-bs);
`
const LogoWrapper = styled.div`
  font-size:2rem;
`
const UnOrderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: white;
`
const LiFlexItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0.75em 1em;
  border-bottom: 2px solid var(--primary-color-border);
  cursor: pointer;
  box-shadow: var(--sidebar-bs);
`
const LiFlexItemLogo = styled.li`
  display: flex;
  justify-content: start;
  align-items:center;
  gap :12px;
  margin: 0 auto;
  padding: 8px 16px;
  border-bottom: 2px solid var(--primary-color-border);
  cursor: pointer;
  font-size: 1.5rem;
  background-color: var(--secondary-color);
`
