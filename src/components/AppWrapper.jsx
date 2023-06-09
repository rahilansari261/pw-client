import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./Index";
import { Products, ProductList, AddProduct, ViewProduct } from "../pages/Products/Index";
import { Clients, ClientList, AddClient, ViewClient } from "../pages/Clients/Index";
import { Invoices, InvoiceList, AddInvoice, ViewInvoice, InvoiceReport } from "../pages/Invoices/Index";
import { Accounts, AccountList, AddAccount, ViewAccount, AccountEntry } from "../pages/Accounts/Index";
import { Settings } from "../pages/Settings/Index";
import { NeedHelp } from "../pages/NeedHelp";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../reducers/drawerSlice";
export const AppWrapper = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const width = useSelector((state) => state.sidebarWidth.width);

  const handleClick = (event) => {
    const clickX = event.clientX;
    const pageWidth = window.innerWidth;
    if (isOpen && clickX > width) {
      dispatch(close());
    }
  };

  return (
    <AppContainer onClick={handleClick}>
      <Sidebar title={`/${pathName[1]}`} />
      <PageWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="viewproduct/:id" element={<ViewProduct />} />
          </Route>
          <Route path="clients" element={<Clients />}>
            <Route index element={<ClientList />} />
            <Route path="clientlist" element={<ClientList />} />
            <Route path="addclient" element={<AddClient />} />
            <Route path="viewclient/:id" element={<ViewClient />} />
          </Route>

          <Route path="invoices" element={<Invoices />}>
            <Route index element={<InvoiceList />} />
            <Route path="invoicelist" element={<InvoiceList />} />
            <Route path="addinvoice" element={<AddInvoice />} />
            <Route path="viewinvoice/:id" element={<ViewInvoice />} />
            <Route path="invoicereport" element={<InvoiceReport />} />
          </Route>

          <Route path="accounts" element={<Accounts />}>
            <Route index element={<AccountList />} />
            <Route path="accountlist" element={<AccountList />} />
            <Route path="addaccount" element={<AddAccount />} />
            <Route path="viewaccount/:id" element={<ViewAccount />} />
            <Route path="accountentry/:id" element={<AccountEntry />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="needhelp" element={<NeedHelp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </PageWrapper>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  position: relative;
`;

const PageWrapper = styled.main`
  min-height: 100vh;
  width: 80%;
  /* flex: 4; */
  flex: 1;
  background: linear-gradient(300deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  @media (max-width: 550px) {
    background: #fff;
  }
`;
