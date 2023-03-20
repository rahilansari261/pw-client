import * as Icon from 'react-feather'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
export const Sidebar = () => {
  return (
    <Aside>
      <nav>
        <UnOrderedList>
          <Link to='/'>
            <LiFlexItemLogo>
              <div>
                <Icon.Zap />
              </div>
              <div>Paperweight</div>
            </LiFlexItemLogo>
          </Link>
          <Link to='/'>
            <LiFlexItem>
              <div>Dashboard</div>
              <div>
                <Icon.Activity />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/clients'>
            <LiFlexItem>
              <div>Clients</div>
              <div>
                <Icon.Users />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/products'>
            <LiFlexItem>
              <div>Products</div>
              <div>
                <Icon.ShoppingBag />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/invoices'>
            <LiFlexItem>
              <div>Invoices</div>
              <div>
                <Icon.Book />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/settings'>
            <LiFlexItem>
              <div>Settings</div>
              <div>
                <Icon.Settings />
              </div>
            </LiFlexItem>
          </Link>
          <Link to='/logout'>
            <LiFlexItem>
              <div>Logout</div>
              <div>
                <Icon.LogOut />
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
const UnOrderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: white;
`
const LiFlexItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0.75em;
  border-bottom: 2px solid var(--primary-color-border);
  cursor: pointer;
`
const LiFlexItemLogo = styled.li`
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
  padding: 0.75em;
  border-bottom: 2px solid var(--primary-color-border);
  cursor: pointer;
  font-size:1.25rem;
  background-color:var(--secondary-color)
`
