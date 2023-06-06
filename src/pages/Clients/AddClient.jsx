import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const validationSchema = Yup.object().shape({
  client_company_name: Yup.string().required("Client Company Name Must be filled"),
  client_name: Yup.string().required("Client Name Must be filled"),
});

const initialValues = {
  client_company_name: "",
  client_name: "",
  client_address: "",
  client_phone: "",
  client_email: "",
  client_tin: "",
  client_stn: "",
  client_notes: "",
};

export const AddClient = () => {
  const { data, isLoading, error, postData } = useFetch();
  const winWidth = useWindowWidth();
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const cData = {
      clientData: {
        ...values,
      },
    };
    console.log(cData);
    postData(cData, "clients/add");
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Add new client</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <StyledForm>
            <Container>
              <Label htmlFor="">Company Name *</Label>
              <Input type="text" name="client_company_name" id="client_company_name" autoComplete="off" placeholder="Name of Company to be used in invoices" />
              <ErrorMsg name="client_company_name" component="div" className="error" />
            </Container>
            <Container>
              <Label htmlFor="">Client Name *</Label>
              <Input type="text" name="client_name" id="client_name" autoComplete="off" placeholder="Name of Client to be used in invoices" />
              <ErrorMsg name="client_name" component="div" className="error" />
            </Container>
            <Container>
              <Label htmlFor="">Client Address *</Label>
              <Field
                as="textarea"
                type="text"
                name="client_address"
                id="client_address"
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
              <Label htmlFor="">Phone *</Label>
              <Input type="number" name="client_phone" id="client_phone" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">Email *</Label>
              <Input type="email" name="client_email" id="client_email" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">GST No. *</Label>
              <Input type="text" name="client_tin" id="client_tin" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">Sevice Tax No. *</Label>
              <Input type="text" name="client_stn" id="client_stn" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">Client Notes </Label>
              <Field
                as="textarea"
                type="text"
                name="client_notes"
                id="client_notes"
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
              <SubmitButton type="submit">Save Client</SubmitButton>
            </Container>
          </StyledForm>
        </Formik>
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
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  /* flex: 1; */
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

// const TextArea = styled.textarea`
//   background-color: var(--white-color);
//   padding: 8px;
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
// `;

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
  margin-top: 1em;
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
