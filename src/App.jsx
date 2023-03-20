import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Clients } from './pages/Clients/Clients'
import { Products } from './pages/Products/Products'
import { Dashboard } from './pages/Dashboard'
import { Invoices } from './pages/Invoices/Invoices'
import { Settings } from './pages/Settings/Settings'
import styled from 'styled-components'

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <PageWrapper>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/products' element={<Products />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/logout' element={<Dashboard />} />
        </Routes>
      </PageWrapper>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
`

const PageWrapper = styled.main`
  flex: 4;
  background: linear-gradient(
    45deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
`
