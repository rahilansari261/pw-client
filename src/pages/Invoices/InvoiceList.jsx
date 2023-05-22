import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { convertCurrencyToIndian, convertDate } from "../../util/helper";
import { LineWave } from "react-loader-spinner";

export const InvoiceList = () => {
  const { data, isLoading, error } = useFetch("https://pw-backend.onrender.com/api/v1/invoices/1/10/All");
  let invoiceData;
  const sanitizeTableData = (iData) =>
    iData.map((invoice) => {
      const FY = "22-23";

      return {
        _id: invoice._id,
        no: invoice.invoice_data.number,
        FY,
        date: convertDate(invoice.invoice_data.date),
        client: invoice.client_data.client_name,
        company: invoice.client_data.client_company_name,
        amount: convertCurrencyToIndian(invoice.invoice_data.grand_total),
        due: convertCurrencyToIndian(invoice.invoice_data.balance),
      };
    });

  if (!isLoading) {
    const { data: iData } = data;
    invoiceData = sanitizeTableData(iData);
  }

  const clickHandle = () => {};
  const btnFunc = () => {};
  const tableHelperData = {
    actionColumnSrc: "/invoices/viewinvoice/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "No", "FY", "date", "client", "company", "amount", "due"],
    actionColumnButtonFunc: btnFunc,
  };

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
          <Link to="/invoices/invoicereport">
            <Button label="primary" clickHandle={() => {}}>
              Invoice Report
            </Button>
          </Link>
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type="text" placeholder="Search" />
            <Button label="info" clickHandle={clickHandle}>
              Search
            </Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>
        {!isLoading ? (
          <Table tableData={invoiceData} tableHelperData={tableHelperData} />
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
        <Pagination />
      </DetailSection>
      <Outlet />
    </Main>
  );
};

const Main = styled.div`
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
  margin-top:4em;
  @media (max-width: 550px) {
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
