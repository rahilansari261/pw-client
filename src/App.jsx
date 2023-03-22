import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Clients } from './pages/Clients/Clients'
import { ClientList } from './pages/Clients/ClientList'

import { AddClient } from './pages/Clients/AddClient'
import { ViewClient } from './pages/Clients/ViewClient'
import { Products } from './pages/Products/Products'
import { Dashboard } from './pages/Dashboard'
import { Invoices } from './pages/Invoices/Invoices'
import { Settings } from './pages/Settings/Settings'
import { Logout } from './pages/Logout'
import styled from 'styled-components'

function App() {
  const location = useLocation()
  const pathName = location.pathname.split('/')
  return (
    <AppContainer>
      <Sidebar title={`/${pathName[1]}`} />
      <PageWrapper>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='clients' element={<Clients />}>
            <Route index element={<ClientList />} />
            <Route path='clientlist' element={<ClientList />} />
            <Route path='addclient' element={<AddClient />} />
            <Route path='viewclient/:id' element={<ViewClient />} />
          </Route>

          <Route path='products' element={<Products />} />
          <Route path='invoices' element={<Invoices />} />
          <Route path='settings' element={<Settings />} />
          <Route path='logout' element={<Logout />} />
        </Routes>
      </PageWrapper>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  position: relative;
`

const PageWrapper = styled.main`
  flex: 4;
  background: linear-gradient(
    300deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  @media (max-width: 550px) {
    flex: 1;
  }
`
