import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Table } from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { convertCurrencyToIndian, convertDate } from "../../util/helper";

const validationSchema = Yup.object().shape({});

const initialValues = {
  modes: "cash",
  // entry_date: convertDate(new Date()),
};

export const AccountEntry = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const { data: clientData, isLoading: clientIsLoading, error: clientError, fetchData: clientFetch } = useFetch();
  const { id } = useParams();
  const [invoiceAccountData, setInvoiceAccountData] = useState(null);
  const [clientAccountData, setClientAccountData] = useState(null);
  const [invoiceArray, setInvoiceArray] = useState(null);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    fetchData(`invoices/unpaid/${id}`);
    clientFetch(`clients/${id}`);
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    let inputVal = parseInt(value);
    if (!inputVal) {
      inputVal = 0;
    }
    if (inputVal < 0) {
      inputVal = 0;
    }
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];

      updatedValues[index] = inputVal;
      return updatedValues;
    });
  };

  const senitizeInvoiceData = (invoArr) => {
    return invoArr.map((item, index) => {
      const { number, date, balance, grand_total } = item.invoice_data;
      return {
        _id: item._id,
        number,
        date: convertDate(date),
        amount: <Input type="number" min="0" value={inputValues[index]} onChange={(e) => handleInputChange(e, index)} name="entry_amount" id="entry_amount" autoComplete="off" placeholder="" />,
        balance: convertCurrencyToIndian(balance),
        grand_total: convertCurrencyToIndian(grand_total),
      };
    });
  };

  useEffect(() => {
    if (!clientIsLoading) {
      setClientAccountData(clientData.data);
    }
  }, [clientIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      setInvoiceAccountData(data.data);
      setInvoiceArray(senitizeInvoiceData(data.data));
    }
  }, [isLoading]);

  const handleSubmit = (values, { setSubmitting }) => {
    // const apidata = {
    //   ...item,
    //   invoice_data: {
    //     ...item.invoice_data,
    //     _id: item._id,
    //     number: item.invoice_data.number,
    //     date: convertDate(item.invoice_data.date),
    //     amount: <Input type="number" value={inputValues[index]} onChange={(e) => handleInputChange(e, index)} name="entry_amount" id="entry_amount" autoComplete="off" placeholder="" />,
    //     balance: convertCurrencyToIndian(item.invoice_data.balance),
    //     grand_total: convertCurrencyToIndian(item.invoice_data.grand_total),
    //   },
    // };
    clientAccountData.invoice_list = invoiceAccountData;
    const accountData = clientAccountData;
    const updatedInvoiceList = accountData.invoice_list.map((item, index) => {
      return { ...item, amount: parseInt(inputValues[index]) };
    });
    accountData.invoice_list = updatedInvoiceList;
    console.log(accountData);
  };
  const winWidth = useWindowWidth();

  const tableHelperData = {
    actionColumnSrc: null,
    tableHeadRowData: ["id", "Invoice No.", "Date", "Amount", "Balance", "Total"],
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoice} />
          <Title>Account Entry</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        {clientAccountData !== null && invoiceArray !== null ? (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values }) => (
              <StyledForm>
                <Container>
                  <Label htmlFor="">Client Name</Label>
                  <div>{clientAccountData.client_name}</div>
                  {/* <ErrorMsg name="client_company_name" component="div" className="error" /> */}
                </Container>

                <Container>
                  <Label htmlFor="">Balance</Label>
                  <div>{convertCurrencyToIndian(clientAccountData.client_balance)} </div>
                </Container>

                <Container>
                  <Label htmlFor="">Type Of Entry </Label>
                  <RadioWrapper>
                    <Field type="radio" id="payment_type" name="payment_type" value="received" />
                    <RadioLabel htmlFor="payment_received">Payment Received</RadioLabel>
                    <Field type="radio" id="payment_type" name="payment_type" value="return" />
                    <RadioLabel htmlFor="payment_return">Payment Return</RadioLabel>
                  </RadioWrapper>
                </Container>

                <Container>
                  <Label htmlFor="">Date Of Entry </Label>
                  <Field
                    type="date"
                    name="entry_date"
                    id="entry_date"
                    dateformat="dd-mm-yyyy"
                    style={{
                      backgroundColor: "var(--white-color)",
                      padding: "8px",
                      color: "var(--black-color)",
                      border: "1px solid var(--table-border-color)",
                      borderRadius: "4px",
                      outline: "none",
                      width: winWidth < 550 ? "100%" : "60%",
                      fontFamily: "inherit",
                      ":focus": {
                        boxShadow: "var(--input-bs)",
                      },
                    }}
                  />
                </Container>

                <Container>
                  <Label>Mode Of Entry</Label>
                  <Field
                    as="select"
                    name="modes"
                    id="mode_selected"
                    style={{
                      backgroundColor: "var(--white-color)",
                      padding: "8px",
                      color: "var(--black-color)",
                      border: "1px solid var(--table-border-color)",
                      borderRadius: "4px",
                      outline: "none",
                      width: winWidth < 550 ? "100%" : "60%",
                      fontFamily: "inherit",
                      ":focus": {
                        boxShadow: "var(--input-bs)",
                      },
                    }}
                  >
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="neft">NEFT</option>
                    <option value="rtgs">RTGS</option>
                    <option value="upi">UPI</option>
                    <option value="others">Others</option>
                  </Field>
                </Container>
                {values.modes === "cheque" ? (
                  <Container>
                    <Label htmlFor="">Checque No. </Label>
                    <Input type="number" name="cheque_no" id="cheque_no" autoComplete="off" placeholder="" />
                  </Container>
                ) : (
                  values.modes !== "cash" && (
                    <Container>
                      <Label htmlFor="">Txn No. </Label>
                      <Input type="text" name="txn_no" id="txn_no" autoComplete="off" placeholder="" />
                    </Container>
                  )
                )}
                <Container>
                  <Label htmlFor="">Amount </Label>
                  <Input type="number" name="amount" id="amount" autoComplete="off" placeholder="" />
                </Container>
                <Container>
                  <Label htmlFor="">Remark </Label>
                  <Field
                    as="textarea"
                    type="text"
                    name="remark"
                    id="remark"
                    autoComplete="off"
                    placeholder=""
                    rows="2"
                    style={{
                      backgroundColor: "var(--white-color)",
                      padding: "8px",
                      color: "var(--black-color)",
                      border: "1px solid var(--table-border-color)",
                      borderRadius: "4px",
                      outline: "none",
                      width: winWidth < 550 ? "100%" : "60%",
                      fontFamily: "inherit",
                      ":focus": {
                        boxshadow: "var(--input-bs)",
                      },
                    }}
                  />
                </Container>
                <Container>
                  <Label htmlFor="">New Balance </Label>
                  <div>3500 </div>
                </Container>

                <Container>
                  <Table tableData={invoiceArray} tableHelperData={tableHelperData} />
                </Container>

                <Container>
                  <SubmitButton type="submit">Save Entry</SubmitButton>
                </Container>
              </StyledForm>
            )}
          </Formik>
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
      </DetailSection>
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

const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 0 1em 1em;
  border-radius: 0 0 4px 4px;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;

const Label = styled.label`
  /* flex: 1; */
  text-align: right;
`;

// const Input = styled.input`
//   background-color: var(--white-color);
//   padding: 8px;
//   margin-left: 20px;
//   color: var(--black-color);
//   border: 1px solid var(--table-border-color);
//   border-radius: 4px;
//   width: 100%;
//   outline: none;
//   font-family: inherit;
//   &:focus {
//     box-shadow: var(--input-bs);
//   }
//   flex: 2;
//   @media (max-width: 550px) {
//     margin-left: 0px;
//   }
// `;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Input = styled(Field)`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 60%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;
const Radio = styled.input`
  margin-left: 8px;
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;
const RadioLabel = styled.label`
  margin-left: 4px;
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;

const DateInput = styled.input`
  flex: 2;
  background-color: var(--white-color);
  padding: 8px;
  margin-left: 20px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;

  &:focus {
    box-shadow: var(--input-bs);
  }
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;
const Select = styled.select`
  flex: 2;
  background-color: var(--white-color);
  padding: 8px;
  margin-left: 20px;
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
    margin-left: 0px;
  }
`;
const ErrorMsg = styled(ErrorMessage)`
  color: #c82333;
  font-size: 12px;
  position: absolute;
  top: 100%;
  left: 0;
  /* Add your custom styles here */
`;

const SubmitButton = styled.button`
  width: fit-content;
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: pointer;
  text-align: center;
  background-color: #218838;
  border-radius: 4px;
  border: none;
`;

const Container = styled.div`
  position: relative;
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
