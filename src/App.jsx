import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import {
  Products,
  ProductList,
  AddProduct,
  ViewProduct,
} from './pages/Products/Index'
import {
  Clients,
  ClientList,
  AddClient,
  ViewClient,
} from './pages/Clients/Index'
import {
  Invoices,
  InvoiceList,
  AddInvoice,
  ViewInvoice,
  InvoiceReport,
} from './pages/Invoices/Index'
import {
  Accounts,
  AccountList,
  AddAccount,
  ViewAccount,
  AccountEntry,
} from './pages/Accounts/Index'
import { Settings } from './pages/Settings/Index'
import { NeedHelp } from './pages/NeedHelp'
import { Logout } from './pages/Logout'
import styled from 'styled-components'

function App() {
  const location = useLocation()
  const pathName = location.pathname.split('/')
  const [open, setOpen] = useState()

  const handleNav = (val) => {
    setOpen(val)
  }

  return (
    <AppContainer>
      <Sidebar title={`/${pathName[1]}`} open={open} />
      <PageWrapper>
        <Header handleNav={handleNav} />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='products' element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path='productlist' element={<ProductList />} />
            <Route path='addproduct' element={<AddProduct />} />
            <Route path='viewproduct/:id' element={<ViewProduct />} />
          </Route>
          <Route path='clients' element={<Clients />}>
            <Route index element={<ClientList />} />
            <Route path='clientlist' element={<ClientList />} />
            <Route path='addclient' element={<AddClient />} />
            <Route path='viewclient/:id' element={<ViewClient />} />
          </Route>

          <Route path='invoices' element={<Invoices />}>
            <Route index element={<InvoiceList />} />
            <Route path='invoicelist' element={<InvoiceList />} />
            <Route path='addinvoice' element={<AddInvoice />} />
            <Route path='viewinvoice/:id' element={<ViewInvoice />} />
            <Route path='invoicereport' element={<InvoiceReport />} />
          </Route>

          <Route path='accounts' element={<Accounts />}>
            <Route index element={<AccountList />} />
            <Route path='accountlist' element={<AccountList />} />
            <Route path='addaccount' element={<AddAccount />} />
            <Route path='viewaccount/:id' element={<ViewAccount />} />
            <Route path='accountentry/:id' element={<AccountEntry />} />
          </Route>
          <Route path='settings' element={<Settings />} />
          <Route path='needhelp' element={<NeedHelp />} />
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
  min-height: 100vh;
  background: linear-gradient(
    300deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  @media (max-width: 550px) {
    flex: 1;
  }
`
