import { Link, Outlet, redirect, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileInvoiceDollar, faPrint } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import { cabinBold, cabinRegular } from "../../util/Constant";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { convertDate } from "../../util/helper";
import { convertCurrencyToIndian } from "../../util/helper";
import toast, { Toaster } from "react-hot-toast";

export const ViewInvoice = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    fetchData(`invoices/${id}`);
  }, []);

  useEffect(() => {
    if (data !== null) {
      setIsDisabled(!data.data.invoice_data.status);
    }
  }, [isLoading]);

  const deleteInvoice = async () => {
    setIsDisabled(true);
    await toast.promise(fetchData(`invoices/cancel/${id}`), {
      loading: "Loading",
      success: "Invoice deleted sucessfully,",
      error: "Error when invoice deleting",
    });
    return setTimeout(() => {
      navigate("/invoices");
    }, 3000);
    // return navigate("/invoices");
  };
  const printInvoice = () => {};
  const clickHandle = () => {};

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          <Title>Invoice</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Link to="/invoices/invoicelist">
            <Button label="warning">
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "14px", marginRight: "4px" }} />
              Back
            </Button>
          </Link>
          {/* <Link to="/invoices/invoicereport"> */}
          <Button label="secondary" clickHandle={() => printInvoice}>
            <FontAwesomeIcon icon={faPrint} style={{ fontSize: "14px", marginRight: "4px" }} />
            Print
          </Button>
          {/* </Link> */}
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        {!isLoading ? (
          <Invoice>
            <InvoiceWrapper>
              <InvoiceRow>
                <LeftSide>
                  <InvoiceNumber>Invoice #{data.data.invoice_data.number}</InvoiceNumber>
                  <InvoiceDate>Date: {convertDate(data.data.invoice_data.date)}</InvoiceDate>
                </LeftSide>
                <RightSide>Tax Invoice</RightSide>
              </InvoiceRow>
              <AddressRow>
                <SellerInfo>
                  <Name>{data.data.user_data.user_company_name}</Name>
                  <Address>{data.data.user_data.user_address}</Address>
                  <Phone>{data.data.user_data.user_phone}</Phone>
                  <GST>{data.data.user_data.user_stn}</GST>
                </SellerInfo>
                <BuyerInfo>
                  {/* <BuyerTitle>Client's Details:</BuyerTitle> */}
                  <Name>{data.data.client_data.client_company_name}</Name>
                  <Address>{data.data.client_data.client_address}</Address>
                  <Phone>{data.data.client_data.client_phone}</Phone>
                  <GST>{data.data.client_data.client_stn}</GST>
                </BuyerInfo>
              </AddressRow>
              <TableWrapper>
                <TableContent>
                  <TableHead>
                    <TableRow>
                      <TableHeadData>Product Name</TableHeadData>
                      <TableHeadData>Price(Rs)</TableHeadData>
                      <TableHeadData>Quantity</TableHeadData>
                      <TableHeadData>Tax(%)</TableHeadData>
                      <TableHeadData>Total(Rs)</TableHeadData>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.product_data.map((item) => (
                      <TableRow key={item._id}>
                        <TableData>
                          {item.product_name}
                          <br />
                          {item.product_desc}
                        </TableData>
                        <TableData>{convertCurrencyToIndian(item.product_price)}</TableData>
                        <TableData>{item.qty}</TableData>
                        <TableData>
                          {convertCurrencyToIndian(item.tax_amount)}
                          <br />
                          {item.tax_name}
                        </TableData>
                        <TableData>{convertCurrencyToIndian(item.row_total)}</TableData>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TermsTableData>{data.data.user_data.user_tc}</TermsTableData>
                      <TableData>Sub Total</TableData>
                      <TableData>{convertCurrencyToIndian(data.data.invoice_data.sub_total)}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>
                        Tax Summary <br />
                        {/* {data.data.invoice_data.sub_total} */}
                      </TableData>
                      <TableData>{convertCurrencyToIndian(data.data.invoice_data.taxTotal)}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>Discount</TableData>
                      <TableData>{convertCurrencyToIndian(data.data.invoice_data.discount)}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>Grand Total</TableData>
                      <TableData>{convertCurrencyToIndian(data.data.invoice_data.grand_total)}</TableData>
                    </TableRow>
                  </TableBody>
                </TableContent>
              </TableWrapper>
              <BottomLine>
                <LeftNote>This is a Computer Generated Document, No Signature Required.</LeftNote>
                <RightNote>Paper Weight | Roaring Studios Product</RightNote>
              </BottomLine>
            </InvoiceWrapper>
            <div style={{ display: "grid", placeItems: "center", padding: "12px" }}>
              <SubmitButton onClick={deleteInvoice} disabled={isDisabled}>
                Delete Invoice
              </SubmitButton>
              {/* <Button label="danger" clickHandle={deleteInvoice}>
                Delete Invoice
              </Button> */}
            </div>
          </Invoice>
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
      </DetailSection>

      <Toaster />
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
const Invoice = styled.div``;
const InvoiceWrapper = styled.div`
  max-width: 700px;
  padding: 1em 1em 0 1em;
  border: 1px solid var(--table-border-color);
  margin: 0 auto;
`;
const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const InvoiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4em;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${cabinRegular};
`;
const InvoiceNumber = styled.div``;
const InvoiceDate = styled.div``;
const RightSide = styled.h1`
  font-family: ${cabinRegular};
  font-size: 46px;
  @media (max-width: 550px) {
    font-size: 32px;
  }
`;
const AddressRow = styled.div`
  display: flex;
  padding-bottom: 2em;
  font-family: ${cabinRegular};
  gap: 2em;
`;
const SellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: ${cabinRegular};
`;

const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${cabinRegular};
  flex: 1;
  &::before {
    content: "Clients Details:";
    margin-top: -16px;
    font-size: 70%;
  }
`;
const Name = styled.div`
  font-family: ${cabinBold};
`;
const Address = styled.div`
  font-family: ${cabinRegular};
`;
const Phone = styled.div`
  font-family: ${cabinRegular};
`;
const GST = styled.div`
  font-family: ${cabinRegular};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;
const TableContent = styled.table`
  width: 100%;
  border: 1px solid var(--table-border-color);
  border-collapse: collapse;
  font-size: 14px;
  color: #333333;
`;
const TableHead = styled.thead`
  border-bottom: 2px solid var(--table-border-color);
`;
const TableRow = styled.tr``;
const TableBody = styled.tbody`
  background-color: var(--table-cell-color);
`;
const TableData = styled.td`
  border-right: 1px solid var(--table-border-color);
  border-bottom: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: "Cabin-Regular";
`;
const TermsTableData = styled(TableData).attrs({
  colSpan: 3,
  rowSpan: 4,
})`
  vertical-align: top;
`;
const TableHeadData = styled.th`
  border-right: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: "Cabin-Bold";
  text-transform: capitalize;
`;
const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1em;
`;
const LeftNote = styled.div`
  font-size: 70%;
  font-family: ${cabinRegular};
`;
const RightNote = styled.div`
  font-size: 70%;
  font-family: ${cabinRegular};
`;

const SubmitButton = styled.button`
  width: max-content;
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-align: center;
  background-color: ${(props) => (props.disabled ? "hsla(0, 0%, 0%, 0.243)" : "#c82333")};
  border-radius: 4px;
  border: none;
`;
