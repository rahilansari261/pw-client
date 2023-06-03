import styled from "styled-components";
import { Button } from "../../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { json, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  // product_name: Yup.string().required("Product Name Must be filled"),
  // product_code: Yup.string().required("Product Code Must be filled"),
});
const initialValues = {
  user_name: "",
  user_tin: "",
  user_stn: "",
  user_phone: "",
  user_address: "",
};

export const Profile = () => {
  const { id } = useParams();
  const winWidth = useWindowWidth();
  const { data, isLoading, error, fetchData, postData } = useFetch();
  const [initialValuesFromAPI, setInitialValuesFromAPI] = useState(null);

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    fetchData(`users/${user._id}`);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setInitialValuesFromAPI({ ...data.data });
    }
  }, [isLoading, data]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);

    postData(
      {
        userData: {
          ...values,
        },
      },
      `users/update`
    );
  };

  return (
    <>
      {!isLoading && initialValuesFromAPI !== null ? (
        <Formik initialValues={{ ...initialValues, ...initialValuesFromAPI }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <StyledForm>
            <Container style={{ flexDirection: "row", gap: "16px", alignItems: "center", paddingTop: "0px" }}>
              <Label htmlFor="">Company Name: </Label>
              <div style={{ fontFamily: "Cabin-Bold" }}>{user.user_company_name}</div>
            </Container>
            <Container>
              <Label htmlFor="">Name *</Label>
              <Input type="text" name="user_name" id="user_name" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">GST No. *</Label>
              <Input type="text" name="user_tin" id="user_tin" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">Sevice Tax No. *</Label>
              <Input type="text" name="user_stn" id="user_stn" autoComplete="off" placeholder="" />
            </Container>

            <Container>
              <Label htmlFor="">Phone *</Label>
              <Input type="number" name="user_phone" id="user_phone" autoComplete="off" placeholder="" />
            </Container>

            <Container>
              <Label htmlFor=""> Address *</Label>
              <Field
                as="textarea"
                type="text"
                name="user_address"
                id="user_address"
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
              <Label htmlFor=""> </Label>
              <FootNote>
                Please note these information will be used in invoices. <br /> Please check before saving them.
              </FootNote>
            </Container>
            <Container>
              <SubmitButton type="submit">Update My Profile</SubmitButton>
            </Container>
          </StyledForm>
        </Formik>
      ) : (
        <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
      )}
    </>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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

const FootNote = styled.div`
  flex: 2;
  font-size: 12px;
`;
