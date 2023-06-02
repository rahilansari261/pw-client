import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Table } from "../../components/Index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetch from "../../hooks/useFetch";

import { useDispatch, useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
const validationSchema = Yup.object().shape({
  tax: Yup.string().required("Tax Name Must be filled"),
  rate: Yup.string().required("Tax Rate Must be filled"),
});
const initialValues = {
  tax: "",
  rate: "",
};

export const TaxAndTerms = () => {
  const { data, isLoading, error, fetchData, postData } = useFetch();
  const user = useSelector((state) => state.user.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taxData, setTaxData] = useState(null);

  // let taxData = null;

  const sanitizeTaxData = (taxArr) =>
    taxArr.map((item) => {
      const { _id, type, rate } = item;
      return { _id, type, rate };
    });

  const fetchFunc = async () => {
    await fetchData(`users/${user._id}`);
    setTaxData(sanitizeTaxData(data.data.user_settings.user_tax));
    setIsLoaded(true);

  };
  const anotherFunc = async () => {
    await fetchFunc();
  };

  // useEffect(() => {
  //   anotherFunc();        
  // }, [data]);

  if (!isLoaded) {
    anotherFunc();
  }
  // console.log(isLoading);
  // if (isLoaded && !isLoading) {
  //   taxData = sanitizeTaxData(data.data.user_settings.user_tax);
  // }
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    setIsLoaded(false);
    console.log({ ...values });
    await postData(
      {
        userData: {
          type: values.tax,
          rate: values.rate,
        },
      },
      `users/settings/addtax`
    );
    // await fetchFunc();
  };

  const removeTax = (id) => {
    console.log(taxData);
    setTaxData((prev) => prev.filter((pre) => pre._id != id));
  };
  const tableHelperData = {
    actionColumnSrc: null,
    actionColumnTitle: "Action",
    actionColumnValue: "Delete",
    actionColumnColor: "danger",
    tableHeadRowData: ["tax", "rate"],
    actionColumnButtonFunc: removeTax,
  };

  return (
    <Wrapper>
      <TermsWrapper>
        <TermsTitle>Terms & Conditions</TermsTitle>
        <TextArea type="text" name="terms" id="terms" autoComplete="off" placeholder="These are the terms and conditions you can change it for your invoice if you want." rows="7" />
        <SubmitButton type="submit">Update Terms & Conditions</SubmitButton>
      </TermsWrapper>
      <TaxWrapper>
        <TaxTitle>Taxes</TaxTitle>
        <Formik initialValues={{ ...initialValues }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <StyledForm>
            <Container>
              <Input type="text" name="tax" id="tax" autoComplete="off" placeholder="Tax name." />
              <ErrorMsg name="tax" component="div" className="error" />
            </Container>
            <Container>
              <Input type="number" name="rate" id="rate" autoComplete="off" placeholder="Tax rate." />
              <ErrorMsg name="rate" component="div" className="error" />
            </Container>
            <Container>
              <SubmitButton type="submit">Add Tax</SubmitButton>
            </Container>
          </StyledForm>
        </Formik>

        {taxData !== null && isLoaded ? (
          <Table tableData={taxData} tableHelperData={tableHelperData}></Table>
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
      </TaxWrapper>
    </Wrapper>
  );
};

const ErrorMsg = styled(ErrorMessage)`
  color: #c82333;
  font-size: 12px;
  position: absolute;
  top: 100%;
  left: 0;
  /* Add your custom styles here */
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SubmitButton = styled.button`
  width: max-content;
  font-size: 12px;
  color: var(--white-color);
  padding: 0.65em;
  cursor: pointer;
  text-align: center;
  background-color: #218838;
  border-radius: 4px;
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2em;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const TermsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const TermsTitle = styled.div`
  margin-bottom: 8px;
`;
const TaxTitle = styled(TermsTitle)``;
const TaxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Input = styled(Field)`
  background-color: var(--white-color);

  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;

const TextArea = styled.textarea`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  margin-bottom: 8px;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;
