import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";

export const AccountEntry = () => {
  const clickHandle = () => {};

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faFileInvoice} />
          <Title>Account Entry</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <Form>
          <FormElement>
            <Label htmlFor="">Client Name </Label>
            <FEValue>Rahil Computers </FEValue>
          </FormElement>
          <FormElement>
            <Label htmlFor="">Balance </Label>
            <FEValue>3000 </FEValue>
          </FormElement>
          <FormElement>
            <Label htmlFor="">Type Of Entry </Label>
            <RadioWrapper>
              <Radio type="radio" id="payment_received" name="payment_received" value="Payment Received" />
              <RadioLabel htmlFor="payment_received">Payment Received</RadioLabel>
              <Radio type="radio" id="payment_return" name="payment_return" value="Payment Return" />
              <RadioLabel htmlFor="payment_return">Payment Return</RadioLabel>
            </RadioWrapper>
          </FormElement>
          <FormElement>
            <Label htmlFor="">Date Of Entry </Label>
            <DateInput type="date" name="" id="" />
          </FormElement>

          <FormElement>
            <Label>Mode Of Entry</Label>
            <Select name="modes" id="mode_selected">
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="neft">NEFT</option>
              <option value="rtgs">RTGS</option>
              <option value="upi">UPI</option>
              <option value="others">Others</option>
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="">Checque No. </Label>
            <Input type="number" name="cheque_no" id="cheque_no" autoComplete="off" placeholder="" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Txn No. </Label>
            <Input type="text" name="txn_no" id="txn_no" autoComplete="off" placeholder="" />
          </FormElement>

          <FormElement>
            <Label htmlFor="">Amount </Label>
            <Input type="number" name="amount" id="amount" autoComplete="off" placeholder="" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Remark </Label>
            <TextArea type="text" name="remark" id="remark" autoComplete="off" placeholder="" rows="2" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">New Balance </Label>
            <FEValue>3500 </FEValue>
          </FormElement>
        </Form>
        <FormElement>
          <Button label="success" clickHandle={clickHandle}>
            Save Entry
          </Button>
        </FormElement>
      </DetailSection>
    </Main>
  );
};
const Main = styled.div`
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
  padding-top:5em;
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

const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 2em; */
  margin-bottom: 1em;
  min-width: 100%;
  @media (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const Label = styled.label`
  flex: 1;
  text-align: right;
`;
const FEValue = styled.div`
  flex: 2;
  text-align: left;
  margin-left: 20px;
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;
const Input = styled.input`
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
  flex: 2;
  @media (max-width: 550px) {
    margin-left: 0px;
  }
`;
const RadioWrapper = styled.div`
  flex: 2;
  text-align: left;
  margin-left: 12px;
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
const TextArea = styled.textarea`
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
  flex: 2;
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
