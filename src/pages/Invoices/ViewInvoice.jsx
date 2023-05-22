import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileInvoiceDollar, faPrint } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import { cabinBold, cabinRegular } from "../../util/Constant";

export const ViewInvoice = () => {
  const clickHandle = () => {};
  const btnFunc = () => {};
  const invoiceData = [
    {
      _id: "1",
      name: "LG Monitor",
      desc: "LED Display LG Monitor",
      price: 15000,
      qty: 1,
      tax_amount: 500,
      tax: "gst@18",
      total: 15500,
    },
    {
      _id: "2",
      name: "LG Monitor",
      desc: "LED Display LG Monitor",
      price: 15000,
      qty: 1,
      tax_amount: 500,
      tax: "gst@18",
      total: 15500,
    },
  ];
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          <Title>Invoice</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Link to="/invoices/invoicelist">
            <Button label="warning" clickHandle={() => {}}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "14px", marginRight: "4px" }} />
              Back
            </Button>
          </Link>
          <Link to="/invoices/invoicereport">
            <Button label="secondary" clickHandle={() => {}}>
              <FontAwesomeIcon icon={faPrint} style={{ fontSize: "14px", marginRight: "4px" }} />
              Print
            </Button>
          </Link>
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        <InvoiceWrapper>
          <InvoiceRow>
            <LeftSide>
              <InvoiceNumber>Invoice #:44532</InvoiceNumber>
              <InvoiceDate>Date: 30-Mar-2023</InvoiceDate>
            </LeftSide>
            <RightSide>Tax Invoice</RightSide>
          </InvoiceRow>
          <AddressRow>
            <SellerInfo>
              <Name>Rahil Computers</Name>
              <Address>Near Mansarovar Metro Jaipur</Address>
              <Phone>7742148739</Phone>
              <GST>AEDS1125498ZS</GST>
            </SellerInfo>
            <BuyerInfo>
              {/* <BuyerTitle>Client's Details:</BuyerTitle> */}
              <Name>Satyam Computers</Name>
              <Address>Near JLN Marg Jaipur</Address>
              <Phone>7990348739</Phone>
              <GST>ZHS22325498ZS</GST>
            </BuyerInfo>
          </AddressRow>
          <TableWrapper>
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
              {invoiceData.map((item) => (
                <TableRow key={item._id}>
                  <TableData>
                    {item.name}
                    <br />
                    {item.desc}
                  </TableData>
                  <TableData>{item.price}</TableData>
                  <TableData>{item.qty}</TableData>
                  <TableData>
                    {item.tax_amount}
                    <br />
                    {item.tax}
                  </TableData>
                  <TableData>{item.total}</TableData>
                </TableRow>
              ))}
              <TableRow>
                <TermsTableData>Hello</TermsTableData>
                <TableData>Sub Total</TableData>
                <TableData>31000</TableData>
              </TableRow>
              <TableRow>
                <TableData>
                  Tax Summary <br />
                  gst@18
                </TableData>
                <TableData>1000</TableData>
              </TableRow>
              <TableRow>
                <TableData>Discount</TableData>
                <TableData>1000</TableData>
              </TableRow>
              <TableRow>
                <TableData>Grand Total</TableData>
                <TableData>30000</TableData>
              </TableRow>
            </TableBody>
          </TableWrapper>
          <BottomLine>
            <LeftNote>This is a Computer Generated Document, No Signature Required.</LeftNote>
            <RightNote>Paper Weight | Roaring Studios Product</RightNote>
          </BottomLine>
        </InvoiceWrapper>
        <div style={{ display: "grid", placeItems: "center", padding: "12px" }}>
          <Button label="danger">Delete Invoice</Button>
        </div>
      </DetailSection>
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
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
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
`;
const AddressRow = styled.div`
  display: flex;
  padding-bottom: 2em;
  font-family: ${cabinRegular};
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
    margin-top: -24px;
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

const TableWrapper = styled.table`
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
