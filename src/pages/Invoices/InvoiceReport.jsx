import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { convertCurrencyToIndian, convertDate } from "../../util/helper";
import { useEffect } from "react";

export const InvoiceReport = () => {
  const { data, isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData("invoices/1/10/All");
  }, []);

  let invoiceData;
  const sanitizeTableData = (iData) =>
    iData.map((invoice) => {
      const FY = "22-23";
      return {
        _id: invoice._id,
        no: invoice.invoice_data.number,
        FY,
        date: convertDate(invoice.invoice_data.date),
        company: invoice.client_data.client_company_name,
        tax: convertCurrencyToIndian(invoice.invoice_data.grand_total),
        amount: convertCurrencyToIndian(invoice.invoice_data.grand_total),
      };
    });

  if (!isLoading && data !== null) {
    const { data: iData } = data;
    console.log(iData);
    invoiceData = sanitizeTableData(iData);
  }

  const tableHelperData = {
    tableHeadRowData: ["id", "No", "FY", "date", "company", "tax", "amount"],
  };
  const handleSearch = () => {};

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          <Title>Invoices</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Link to="/invoices/addinvoice">
            <Button label="success" clickHandle={() => {}}>
              Add New Invoice
            </Button>
          </Link>
          <Link to="/invoices/invoicelist">
            <Button label="primary" clickHandle={() => {}}>
              Invoice List
            </Button>
          </Link>
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type="text" />
            <Button label="info" clickHandle={handleSearch}>
              Search
            </Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>
        {!isLoading && <Table tableData={invoiceData} tableHelperData={tableHelperData} />}
        <Pagination />
      </DetailSection>
      <Outlet />
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  z-index: 0;
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
  @media (max-width: 550px) {
    padding-top: 4em;
    margin: 0em;
    border-radius: 0px;
  }
`;
const TitleSection = styled.div`
  background-color: var(--table-title-section);
  padding: 0.75em 1em;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
`;
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SearchBar = styled.div`
  display: flex;
  width: 40%;
  gap: 12px;
  align-items: center;
  @media (max-width: 550px) {
    width: 70%;
  }
`;
const Input = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;
const SearchDesc = styled.div``;
const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
