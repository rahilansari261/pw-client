import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar, faPlus, faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Table } from "../../components/Index";
import { cabinBold, cabinRegular } from "../../util/Constant";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";

export const AddInvoice = () => {
  const { data: productData, isLoading: isProductLoading, error: productError, fetchData: fetchProductData } = useFetch();
  const { data: clientData, isLoading: isClientLoading, error: clientError, fetchData: fetchClientData } = useFetch();
  const [clientSuggList, setClientSuggList] = useState(null);
  const [productSuggList, setProductSuggList] = useState(null);
  const [matchedClientList, setMatchedClientList] = useState(null);
  const [matchedProductList, setMatchedProductList] = useState(null);
  const [isOpenClient, setOpenClient] = useState(false);
  const [isOpenProduct, setOpenProduct] = useState(false);

  useEffect(() => {
    fetchClientData(`clients/selected/all`);
    fetchProductData(`products/selected/all`);
  }, []);

  useEffect(() => {
    if (!isProductLoading && !isClientLoading) {
      setClientSuggList(clientData.data);
      setProductSuggList(productData.data);
      setMatchedClientList(clientData.data);
      setMatchedProductList(productData.data);
    }
  }, [isProductLoading, isClientLoading]);

  const clickHandle = () => {};
  const handleSearch = () => {};

  const accountData = [
    {
      _id: "1",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
    {
      _id: "2",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
    {
      _id: "3",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
  ];

  const tableHelperData = {
    tableHeadRowData: Object.keys(accountData[0]),
  };
  const getClientList = (lowerInput) => {
    return clientSuggList.filter((client) => {
      const lowerClientName = client.client_name.toLowerCase();
      const lowerCompanyName = client.client_company_name.toLowerCase();
      return lowerClientName.includes(lowerInput) || lowerCompanyName.includes(lowerInput);
    });
  };
  const getProductList = (lowerInput) => {
    return productSuggList.filter((product) => {
      const lowerProductName = product.product_name.toLowerCase();
      const lowerProductCode = product.product_code.toLowerCase();
      const lowerProductDesc = product.product_description.toLowerCase();
      return lowerProductName.includes(lowerInput) || lowerProductCode.includes(lowerInput) || lowerProductDesc.includes(lowerInput);
    });
  };
  const handleChange = (e, x) => {
    e.preventDefault();
    const input = e.target.value;
    if (!input) {
      return x === "client" ? setOpenClient(false) : setOpenProduct(false);
    } else {
      if (x === "client") {
        setOpenProduct(false);
      } else {
        setOpenClient(false);
      }
    }

    const lowerInput = input.toLowerCase();

    const reultedArr = x === "client" ? getClientList(lowerInput) : getProductList(lowerInput);

    if (reultedArr.length === 0) return x === "client" ? setOpenClient(false) : setOpenProduct(false);

    x === "client" ? setOpenClient(true) : setOpenProduct(true);
    x === "client" ? setMatchedClientList(reultedArr) : setMatchedProductList(reultedArr);
    // console.log(reultedArr);
    // console.log(isOpenClient);
    // console.log(isOpenProduct);
  };
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          <Title>Create New Invoice </Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <ItemSearch>
          <SearchTitle>Search Clients :</SearchTitle>
          <AutoComplete>
            <Input type="text" placeholder="search from saved clients..." onChange={(event) => handleChange(event, "client")} />
            {matchedClientList && (
              <MyUl isOpen={isOpenClient}>
                {matchedClientList.map((item) => {
                  return (
                    <MyLi key={item._id}>
                      {item.client_name}, {item.client_company_name}
                    </MyLi>
                  );
                })}
              </MyUl>
            )}
          </AutoComplete>
          <Button label="success" width="225px">
            <FontAwesomeIcon style={{ fontSize: "14px", marginRight: "4px" }} icon={faPlusCircle} />
            Add New Client
          </Button>
        </ItemSearch>

        <ItemWrapper>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Client Name :</ItemTitle>
              <ItemValue>Rahil Computers</ItemValue>
            </ItemInfo>
            <ItemInfo>
              <ItemTitle>Address :</ItemTitle>
              <ItemValue>Delhi</ItemValue>
            </ItemInfo>
          </TwoColumn>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Phone :</ItemTitle>
              <ItemValue>7742148739</ItemValue>
            </ItemInfo>
            <ItemInfo>
              <ItemTitle>GST No :</ItemTitle>
              <ItemValue>ADF33647775TH</ItemValue>
            </ItemInfo>
          </TwoColumn>
        </ItemWrapper>

        <ItemSearch>
          <SearchTitle>Search Products :</SearchTitle>
          <AutoComplete>
            <Input type="text" placeholder="search from saved products..." onChange={(event) => handleChange(event, "product")} />
            {matchedProductList && (
              <MyUl isOpen={isOpenProduct}>
                {matchedProductList.map((item) => {
                  return (
                    <MyLi key={item._id}>
                      {item.product_name}, {item.product_code}, {item.product_description.substring(0, 30)}...
                    </MyLi>
                  );
                })}
              </MyUl>
            )}
          </AutoComplete>
          <Button label="success" width="225px">
            <FontAwesomeIcon style={{ fontSize: "14px", marginRight: "4px" }} icon={faPlusCircle} />
            Add New Product
          </Button>
        </ItemSearch>

        <ItemWrapper>
          <DeleteButton>
            <FontAwesomeIcon icon={faTrashCan} />
          </DeleteButton>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Name :</ItemTitle>
              <ItemValue>LG Monitor</ItemValue>
            </ItemInfo>

            <ItemInfo>
              <ItemTitle>Quantity :</ItemTitle>
              <ItemValue>
                <ProductInput type="number" placeholder="0" />
              </ItemValue>
            </ItemInfo>
          </TwoColumn>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Price :</ItemTitle>
              <ItemValue>15,500</ItemValue>
            </ItemInfo>

            <ItemInfo>
              <ItemTitle>GST :</ItemTitle>
              <ItemValue>18%</ItemValue>
            </ItemInfo>
          </TwoColumn>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Description :</ItemTitle>
              <ItemValue>LG Monitor with retina display high quality build </ItemValue>
            </ItemInfo>
            <ItemInfo>
              <ItemTitle>Total :</ItemTitle>
              <ItemValue>(15500*1) + 1500 = 17000</ItemValue>
            </ItemInfo>
          </TwoColumn>
        </ItemWrapper>
        <ItemWrapper>
          <DeleteButton>
            <FontAwesomeIcon icon={faTrashCan} />
          </DeleteButton>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Name :</ItemTitle>
              <ItemValue>LG Monitor</ItemValue>
            </ItemInfo>

            <ItemInfo>
              <ItemTitle>Quantity :</ItemTitle>
              <ItemValue>
                <ProductInput type="number" placeholder="0" />
              </ItemValue>
            </ItemInfo>
          </TwoColumn>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Price :</ItemTitle>
              <ItemValue>15,500</ItemValue>
            </ItemInfo>

            <ItemInfo>
              <ItemTitle>GST :</ItemTitle>
              <ItemValue>18%</ItemValue>
            </ItemInfo>
          </TwoColumn>
          <TwoColumn>
            <ItemInfo>
              <ItemTitle>Description :</ItemTitle>
              <ItemValue>LG Monitor with retina display high quality build </ItemValue>
            </ItemInfo>
            <ItemInfo>
              <ItemTitle>Total :</ItemTitle>
              <ItemValue>(15500*1) + 1500 = 17000</ItemValue>
            </ItemInfo>
          </TwoColumn>
        </ItemWrapper>
        <TermsAndSummary>
          <Terms>
            <TermsTitle>Terms</TermsTitle>
            <TermsDetail name="terms" id="terms" cols="30" rows="7" placeholder="These are the terms and conditions you can change it for your invoice if you want."></TermsDetail>
          </Terms>
          <Summary>
            <SingleColumn>
              <SummaryInfo>
                <ItemTitle>Sub Total :</ItemTitle>
                <ItemValue>46500</ItemValue>
              </SummaryInfo>

              <SummaryInfo>
                <ItemTitle>Tax Summary :</ItemTitle>
                <ItemValue>4500</ItemValue>
              </SummaryInfo>
              <SummaryInfo>
                <ItemTitle>GST :</ItemTitle>
                <ItemValue>4500</ItemValue>
              </SummaryInfo>

              <SummaryInfo>
                <ItemTitle>Discount :</ItemTitle>
                <ItemValue>
                  <DiscountInput type="number" placeholder="0" />
                </ItemValue>
              </SummaryInfo>
              <SummaryInfo>
                <ItemTitle>Grand Total :</ItemTitle>
                <ItemValue>51000</ItemValue>
              </SummaryInfo>
            </SingleColumn>
          </Summary>
        </TermsAndSummary>
      </DetailSection>
      <ButtonWrapper>
        <Button label="success">Create Invoice</Button>
      </ButtonWrapper>
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
  margin: 0 auto;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 1em;
  background-color: var(--table-cell-color);
  border-radius: 6px;
  border: 1px solid #808080;
  box-shadow: 0.5px 0.5px 0.5px rgba(51, 51, 51, 0.36);
  margin-bottom: 1em;
  position: relative;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 4px;
  right: 8px;
  cursor: pointer;
  color: red;
  font-size: 20px;
  font-weight: bold;
  &:hover {
  }
`;
const TwoColumn = styled.div`
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const ItemInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ItemTitle = styled.div`
  text-align: end;
  flex: 1;
  font-family: ${cabinBold};
  font-size: 14px;
  @media (max-width: 550px) {
    flex: none;
    min-width: 90px;
    /* text-align: unset; */
  }
`;
const ItemValue = styled.div`
  text-align: left;
  flex: 1;
  font-family: ${cabinRegular};
  font-size: 14px;
  @media (max-width: 550px) {
    margin-left: 8px;
  }
`;
const ItemSearch = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  justify-content: space-between;
  gap: 1em;
`;

const SearchTitle = styled.div`
  min-width: 120px;
  @media (max-width: 550px) {
    display: none;
  }
`;
const Input = styled.input`
  background-color: var(--white-color);
  /* margin: 0 1em; */
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
  @media (max-width: 550px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProductInput = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  border: 1px solid #808080;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  @media (max-width: 550px) {
  }
`;
const DiscountInput = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  border: 1px solid #808080;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  @media (max-width: 550px) {
  }
`;

const TermsAndSummary = styled.div`
  display: flex;
  padding: 1em;
  background-color: var(--table-cell-color);
  border-radius: 6px;
  border: 1px solid #808080;
  box-shadow: 0.5px 0.5px 0.5px rgba(51, 51, 51, 0.36);
  margin-bottom: 1em;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Terms = styled.div`
  flex: 3;
`;
const TermsTitle = styled.div`
  font-family: ${cabinBold};
`;
const TermsDetail = styled.textarea`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid #808080;
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;
const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 1em;
`;
const SingleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryInfo = styled(ItemInfo)`
  padding: 4px 0;
  gap: 4px;
`;
const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
  padding-bottom: 1em;
`;
const AutoComplete = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;
const MyUl = styled.ul`
  position: absolute;
  left: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MyLi = styled.li`
  text-align: left;
  list-style: none;
  width: 100%;
  font-size: 14px;
  padding: 0.4em;
  background-color: #fff;
  &:hover {
    background-color: #2d7d87;
    color: #fff;
  }
`;
