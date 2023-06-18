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
import "../../App.css";

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(0, "Amount must be a positive number").required("Amount is required"),
  entries: Yup.array()
    .of(Yup.number())
    .test("sum-validation", "Sum of entries cannot be greater than the amount", function (value) {
      const sumOfEntries = value.reduce((a, b) => a + b, 0);
      const amount = this.parent.amount || 0;

      const isNegativeElementPresent = value.some((element) => element < 0);

      if (isNegativeElementPresent || sumOfEntries > amount) {
        return this.createError({
          message: "Entries must be non-negative and the sum cannot exceed the amount",
          path: this.path,
        });
      }
      return true;
    })
    .required(),
});

const initialValues = {
  modes: "cash",
  amount: 0,
  entry_date: new Date().toISOString().split("T")[0],
  payment_type: "received",
  entries: [],
  txn_no: 0,
  remark: "",
};

export const AccountEntry = () => {
  const { data, isLoading, error, fetchData, postData } = useFetch();
  const { data: clientData, isLoading: clientIsLoading, error: clientError, fetchData: clientFetch } = useFetch();
  const { id } = useParams();
  const [invoiceAccountData, setInvoiceAccountData] = useState(null);
  const [clientAccountData, setClientAccountData] = useState(null);
  const winWidth = useWindowWidth();

  useEffect(() => {
    fetchData(`invoices/unpaid/${id}`);
    clientFetch(`clients/${id}`);
  }, []);

  useEffect(() => {
    if (!clientIsLoading) {
      setClientAccountData(clientData.data);
    }
  }, [clientIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      data.data.map((_, index) => {
        initialValues.entries[index] = 0;
      });
      setInvoiceAccountData(data.data);
    }
  }, [isLoading]);

  const tableHelperData = {
    actionColumnSrc: null,
    tableHeadRowData: ["id", "Invoice No.", "Date", "Amount", "Balance", "Total"],
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const accountData = clientAccountData;
    accountData.invoice_list = invoiceAccountData;

    accountData.invoice_list.map((item, index) => {
      item.amount = values.entries[index];
    });

    const invoiceNumbersArr = accountData.invoice_list.map((item) => {
      if (item.amount > 0) return item.invoice_data.number;
    });

    const entriesTotalAmount = accountData.invoice_list.reduce((accumulator, invoice) => {
      return accumulator + invoice.amount;
    }, 0);
    let invoiceRemark = "";
    let advanceRemark = "";
    let userRemark = "";
    if (invoiceNumbersArr.length > 0 && invoiceNumbersArr.length === 1) {
      invoiceRemark = `For Invoice ${invoiceNumbersArr[0]}.`;
    } else {
      invoiceRemark = `For Invoices ${invoiceNumbersArr.join(", ")}.`;
    }
    if (values.amount - entriesTotalAmount > 0) {
      advanceRemark = `Advance of ${convertCurrencyToIndian(values.amount - entriesTotalAmount)}.`;
    }
    if (values.remark) {
      userRemark = `User: ${values.remark}.`;
    }
    if (values.payment_type === "received") {
      clientAccountData.entry_amount_in = values.amount;
      clientAccountData.entry_amount_out = 0;
      clientAccountData.entry_balance = clientAccountData.client_balance - values.amount;
      clientAccountData.entry_remarks = `${invoiceRemark} ${advanceRemark} ${userRemark}`;
    } else {
      clientAccountData.entry_amount_in = 0;
      clientAccountData.entry_amount_out = values.amount;
      clientAccountData.entry_balance = clientAccountData.client_balance + values.amount;
      clientAccountData.entry_remarks = values.remark;
    }
    clientAccountData.entry_type = "User";

    const currentDate = new Date();
    const parts = values.entry_date.split("-");
    clientAccountData.entry_date = new Date(parts[0], parts[1] - 1, parts[2], currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());

    if (values.modes === "cash") clientAccountData.entry_transaction_number = "Cash";
    if (values.modes === "cheque") clientAccountData.entry_transaction_number = "Cheque No. " + values.txn_no;
    if (values.modes === "neft") clientAccountData.entry_transaction_number = "NEFT Txn No. " + values.txn_no;
    if (values.modes === "rtgs") clientAccountData.entry_transaction_number = "RTGS Txn No. " + values.txn_no;
    if (values.modes === "upi") clientAccountData.entry_transaction_number = "UPI Txn No." + values.txn_no;
    if (values.modes === "others") clientAccountData.entry_transaction_number = "Other " + values.txn_no;
    accountData.client_id = accountData._id;
    console.log(accountData);
    const dataToSend = { accountData: accountData };
    postData(dataToSend, "accounts/add");
    // <Redirect to={`/accounts/viewaccount/${id}`} />;
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
        {clientAccountData !== null && invoiceAccountData !== null ? (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
              <StyledForm>
                <Container>
                  <Label htmlFor="">Client Name</Label>
                  <div>{clientAccountData.client_name}</div>
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
                    <Input type="number" name="txn_no" id="txn_no" autoComplete="off" placeholder="" />
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
                  <ErrorMsg name="amount" component="div" className="error" />
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
                  <div>
                    {values.payment_type === "received"
                      ? convertCurrencyToIndian(parseInt(clientAccountData.client_balance) - parseInt(values.amount))
                      : convertCurrencyToIndian(parseInt(clientAccountData.client_balance) + parseInt(values.amount))}
                  </div>
                </Container>

                <Container>
                  {values.payment_type === "received" && (
                    <Table
                      tableData={invoiceAccountData
                        .map((item, index) => {
                          const { number, date, balance, grand_total } = item.invoice_data;
                          return {
                            _id: item._id,
                            number,
                            date: convertDate(date),
                            amount: (
                              <Input
                                type="number"
                                id={`entries[${index}]`}
                                name={`entries[${index}]`}
                                onChange={(event) => {
                                  const amountValue = parseInt(values.amount);
                                  const entryValue = parseInt(event.target.value);
                                  const sum = values.entries.reduce((a, c) => a + c);
                                  if (entryValue > balance && amountValue > sum) {
                                    return setFieldValue(`entries[${index}]`, balance);
                                  }
                                  setFieldValue(`entries[${index}]`, entryValue);
                                }}
                              />
                            ),
                            balance: convertCurrencyToIndian(balance),
                            grand_total: convertCurrencyToIndian(grand_total),
                          };
                        })
                        .concat({
                          _id: 1,
                          number: "-",
                          date: "Advance",
                          amount: convertCurrencyToIndian(parseInt(values.amount) - values.entries.reduce((a, c) => a + c)),
                          balance: "-",
                          grand_total: "-",
                        })}
                      tableHelperData={tableHelperData}
                    />
                  )}
                  <ErrorMsg name="entries" component="div" className="error" />
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
