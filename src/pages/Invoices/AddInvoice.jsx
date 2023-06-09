import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar, faPlus, faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Table } from "../../components/Index";
import { cabinBold, cabinRegular } from "../../util/Constant";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const initialInvoiceData = {
  client_data: {},
  user_data: {},
  invoice_data: {
    number: 0,
    taxTotal: 0,
    grand_total: 0,
    balance: 0,
    sub_total: 0,
    discount: 0,
    date: new Date(),
    tax_summary: [],
  },
  product_data: [],
};

export const AddInvoice = () => {
  const { data: productData, isLoading: isProductLoading, error: productError, fetchData: fetchProductData } = useFetch();
  const { data: clientData, isLoading: isClientLoading, error: clientError, fetchData: fetchClientData } = useFetch();
  const [clientSuggList, setClientSuggList] = useState(null);
  const [productSuggList, setProductSuggList] = useState(null);
  const [matchedClientList, setMatchedClientList] = useState(null);
  const [matchedProductList, setMatchedProductList] = useState(null);
  const [isOpenClient, setOpenClient] = useState(false);
  const [isOpenProduct, setOpenProduct] = useState(false);
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const { data: invoiceClientData, isLoading: isInvoiceClientLoading, error: invoiceClientError, fetchData: fetchInvoiceClientData } = useFetch();
  const { data: invoiceProductData, isLoading: isInvoiceProductLoading, error: invoiceProductError, fetchData: fetchInvoiceProductData, postData } = useFetch();
  const [clientId, setClientId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [inputClientVal, setInputClientVal] = useState("");
  const [inputProductVal, setInputProductVal] = useState("");
  // const [productQty, setProductQty] = useState(1)
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchClientData(`clients/selected/all`);
    fetchProductData(`products/selected/all`);
    setInvoiceData({ ...invoiceData, user_data: user, invoice_data: { ...invoiceData.invoice_data, date: new Date(), number: user.user_invoice_number } });
  }, []);

  useEffect(() => {
    if (!isProductLoading && !isClientLoading) {
      setClientSuggList(clientData.data);
      setProductSuggList(productData.data);
      setMatchedClientList(clientData.data);
      setMatchedProductList(productData.data);
    }
  }, [isProductLoading, isClientLoading]);

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
    x === "client" ? setInputClientVal(input) : setInputProductVal(input);

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
  };
  const handleClick = (x) => {
    // if (x === "client") {
    //   setOpenProduct(false);
    //   setOpenClient(true);
    // } else {
    //   setOpenProduct(true);
    //   setOpenClient(false);
    // }
  };

  useEffect(() => {
    if (clientId !== null) {
      fetchInvoiceClientData(`clients/${clientId}`);
    }
  }, [clientId]);

  useEffect(() => {
    if (productId !== null) {
      fetchInvoiceProductData(`products/${productId}`);
    }
  }, [productId]);

  useEffect(() => {
    if (invoiceClientData !== null) {
      setInvoiceData({ ...invoiceData, client_data: invoiceClientData.data });
    }
  }, [invoiceClientData]);

  const getInvoiceGrandTotalAndOtherValues = (products) => {
    let taxTotal = 0;
    let grand_total = 0;
    let sub_total = 0;
    products.map((product) => {
      taxTotal = parseInt(taxTotal) + parseInt(product.tax_amount);
      sub_total = parseInt(sub_total) + parseInt(parseInt(product.product_price) * parseInt(product.qty));
      grand_total = parseInt(grand_total) + parseInt(product.row_total);
    });

    return {
      taxTotal,
      grand_total,
      sub_total,
    };
  };
  useEffect(() => {
    if (invoiceProductData !== null) {
      const newProduct = {
        ...invoiceProductData.data,
        qty: 1,
        discount: 0,
        tax_name: invoiceProductData.data.product_tax.type,
        tax_rate: parseInt(invoiceProductData.data.product_tax.rate),
        tax_amount: parseInt(invoiceProductData.data.product_price) * (parseInt(invoiceProductData.data.product_tax.rate) / 100),
        row_total: parseInt(invoiceProductData.data.product_price) + parseInt(invoiceProductData.data.product_price) * (parseInt(invoiceProductData.data.product_tax.rate) / 100),
      };

      const updatedInvoiceData = getInvoiceGrandTotalAndOtherValues([...invoiceData.product_data, newProduct]);
      setInvoiceData({ ...invoiceData, product_data: [...invoiceData.product_data, newProduct], invoice_data: { ...invoiceData.invoice_data, ...updatedInvoiceData } });
    }
  }, [invoiceProductData]);

  const getDetail = (id, x, name) => {
    if (x === "client") {
      setOpenClient(false);
      setInputClientVal("");
      setClientId(id);
    } else {
      setOpenProduct(false);
      setInputProductVal("");
      const isProductPresent = invoiceData.product_data.find((item) => item._id === id);
      if (!isProductPresent) {
        setProductId(id);
      } else {
        const updatedProduct = invoiceData.product_data.map((product) => {
          if (product._id === id) {
            return {
              ...product,
              qty: parseInt(product.qty) + 1,
              tax_amount: parseInt(product.product_price) * (parseInt(product.product_tax.rate) / 100) * parseInt(parseInt(product.qty) + 1),
              row_total:
                parseInt(parseInt(product.product_price) * parseInt(parseInt(product.qty) + 1)) +
                parseInt(parseInt(product.product_price) * (parseInt(product.product_tax.rate) / 100) * parseInt(parseInt(product.qty) + 1)),
            };
          }
          return product;
        });

        const updatedInvoiceData = getInvoiceGrandTotalAndOtherValues(updatedProduct);
        setInvoiceData({ ...invoiceData, product_data: updatedProduct, invoice_data: { ...invoiceData.invoice_data, ...updatedInvoiceData } });
      }
    }
  };

  const handleChangeQty = (e, id) => {
    const inputQty = e.target.value;
    const updatedProduct = invoiceData.product_data.map((product) => {
      if (product._id === id) {
        const val = parseInt(inputQty);
        const newQty = isNaN(val) || val <= 0 || val > parseInt(product.product_unit) ? 1 : parseInt(inputQty);
        return {
          ...product,
          qty: newQty,
          tax_amount: parseInt(product.product_price) * (parseInt(product.product_tax.rate) / 100) * parseInt(newQty),
          row_total: parseInt(parseInt(product.product_price) * parseInt(newQty)) + parseInt(parseInt(product.product_price) * (parseInt(product.product_tax.rate) / 100) * parseInt(newQty)),
        }; // calculate invoice_data values as well like taxTotal, sub_total, grand_total
      }
      return product;
    });

    const updatedInvoiceData = getInvoiceGrandTotalAndOtherValues(updatedProduct);

    setInvoiceData({ ...invoiceData, product_data: updatedProduct, invoice_data: { ...invoiceData.invoice_data, ...updatedInvoiceData } });
  };

  const removeProduct = (id) => {
    const updatedProduct = invoiceData.product_data.filter((product) => product._id !== id);
    const updatedInvoiceData = getInvoiceGrandTotalAndOtherValues(updatedProduct);
    setInvoiceData({ ...invoiceData, product_data: updatedProduct, invoice_data: { ...invoiceData.invoice_data, ...updatedInvoiceData } });
  };

  const submitInvoice = () => {
    const inData = {
      ...invoiceData,
      client_data: { ...invoiceData.client_data, client_id: invoiceData.client_data._id },
      user_data: { ...invoiceData.user_data, user_tc: invoiceData.user_data.user_settings.user_tc, user_logo: invoiceData.user_data.user_settings.user_logo },
    };
    postData(
      {
        invoiceData: { ...inData },
      },
      "invoices/new/add"
    );
    console.log(inData);
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
            <Input type="text" value={inputClientVal} placeholder="search from saved clients..." onChange={(event) => handleChange(event, "client")} onClick={() => handleClick("client")} />
            {matchedClientList && (
              <MyUl isOpen={isOpenClient}>
                {matchedClientList.map((item) => {
                  return (
                    <MyLi key={item._id} onClick={() => getDetail(item._id, "client", item.client_name)}>
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
        {invoiceClientData !== null ? (
          <ItemWrapper>
            <TwoColumn>
              <ItemInfo>
                <ItemTitle>Client Name :</ItemTitle>
                <ItemValue>{invoiceData.client_data.client_name}</ItemValue>
              </ItemInfo>
              <ItemInfo>
                <ItemTitle>Address :</ItemTitle>
                <ItemValue>{invoiceData.client_data.client_address}</ItemValue>
              </ItemInfo>
            </TwoColumn>
            <TwoColumn>
              <ItemInfo>
                <ItemTitle>Phone :</ItemTitle>
                <ItemValue>{invoiceData.client_data.client_phone}</ItemValue>
              </ItemInfo>
              <ItemInfo>
                <ItemTitle>GST No :</ItemTitle>
                <ItemValue>{invoiceData.client_data.client_stn}</ItemValue>
              </ItemInfo>
            </TwoColumn>
          </ItemWrapper>
        ) : (
          <div> selected client will show up here</div>
        )}
        <ItemSearch>
          <SearchTitle>Search Products :</SearchTitle>
          <AutoComplete>
            <Input type="text" value={inputProductVal} placeholder="search from saved products..." onChange={(event) => handleChange(event, "product")} onClick={() => handleClick("product")} />
            {matchedProductList && (
              <MyUl isOpen={isOpenProduct}>
                {matchedProductList.map((item) => {
                  return (
                    <MyLi key={item._id} onClick={() => getDetail(item._id, "product", item.product_name)}>
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

        {invoiceData.product_data.length !== 0
          ? invoiceData.product_data.map((item) => {
              return (
                <ItemWrapper key={item._id}>
                  <DeleteButton onClick={() => removeProduct(item._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </DeleteButton>
                  <TwoColumn>
                    <ItemInfo>
                      <ItemTitle>Name :</ItemTitle>
                      <ItemValue>{item.product_name}</ItemValue>
                    </ItemInfo>

                    <ItemInfo>
                      <ItemTitle>Quantity :</ItemTitle>
                      <ItemValue>
                        <ProductInput value={item.qty} min="1" onChange={(event) => handleChangeQty(event, item._id)} type="number" placeholder="please fill quantity." />
                      </ItemValue>
                    </ItemInfo>
                  </TwoColumn>
                  <TwoColumn>
                    <ItemInfo>
                      <ItemTitle>Price :</ItemTitle>
                      <ItemValue>{item.product_price}</ItemValue>
                    </ItemInfo>

                    <ItemInfo>
                      <ItemTitle>GST :</ItemTitle>
                      <ItemValue>
                        {item.product_tax.type}@{item.product_tax.rate}
                      </ItemValue>
                    </ItemInfo>
                  </TwoColumn>
                  <TwoColumn>
                    <ItemInfo>
                      <ItemTitle>Description :</ItemTitle>
                      <ItemValue>{item.product_description}</ItemValue>
                    </ItemInfo>
                    <ItemInfo>
                      <ItemTitle>Total :</ItemTitle>
                      <ItemValue>
                        ({item.product_price}*{item.qty}) + {item.tax_amount} = {item.row_total}
                      </ItemValue>
                    </ItemInfo>
                  </TwoColumn>
                </ItemWrapper>
              );
            })
          : null}
        {invoiceData.product_data.length !== 0 && (
          <TermsAndSummary>
            <Terms>
              <TermsTitle>Terms</TermsTitle>
              <TermsDetail
                name="terms"
                value={invoiceData.user_data.user_settings.user_tc}
                onChange={(e) => {
                  setInvoiceData({ ...invoiceData, user_data: { ...invoiceData.user_data, user_settings: { ...invoiceData.user_data.user_settings, user_tc: e.target.value } } });
                }}
                id="terms"
                cols="30"
                rows="7"
                placeholder="These are the terms and conditions you can change it for your invoice if you want."
              ></TermsDetail>
            </Terms>
            <Summary>
              <SingleColumn>
                <SummaryInfo>
                  <ItemTitle>Sub Total :</ItemTitle>
                  <ItemValue>{invoiceData.invoice_data.sub_total}</ItemValue>
                </SummaryInfo>

                <SummaryInfo>
                  <ItemTitle>Total Tax :</ItemTitle>
                  <ItemValue>{invoiceData.invoice_data.taxTotal}</ItemValue>
                </SummaryInfo>
                {/* <SummaryInfo>
                  <ItemTitle>GST :</ItemTitle>
                  <ItemValue>4500</ItemValue>
                </SummaryInfo> */}

                <SummaryInfo>
                  <ItemTitle>Discount :</ItemTitle>
                  <ItemValue>
                    <DiscountInput
                      value={invoiceData.invoice_data.discount}
                      onChange={(e) => {
                        let input = parseInt(e.target.value);
                        if (input < 0) return;
                        if (!input) {
                          input = 0;
                        }

                        setInvoiceData({
                          ...invoiceData,
                          invoice_data: { ...invoiceData.invoice_data, discount: input },
                        });
                      }}
                      type="number"
                      placeholder="0"
                    />
                  </ItemValue>
                </SummaryInfo>
                <SummaryInfo>
                  <ItemTitle>Grand Total :</ItemTitle>
                  <ItemValue>{invoiceData.invoice_data.grand_total - parseInt(invoiceData.invoice_data.discount)}</ItemValue>
                </SummaryInfo>
              </SingleColumn>
            </Summary>
          </TermsAndSummary>
        )}
      </DetailSection>
      {invoiceData.product_data.length !== 0 && (
        <ButtonWrapper>
          <Button label="success" clickHandle={submitInvoice}>
            Create Invoice
          </Button>
        </ButtonWrapper>
      )}
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
  /* align-items: center; */
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
    text-transform: lowercase;
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
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2d7d87;
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
`;

const MyLi = styled.li`
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  text-align: left;
  list-style: none;
  width: 100%;
  font-size: 14px;
  padding: 0.4em;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #2d7d87;
    color: #fff;
  }
`;
