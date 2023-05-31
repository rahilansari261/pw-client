import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetch from "../../hooks/useFetch";
const validationSchema = Yup.object().shape({
  old_password: Yup.string().required("Old Password Must be filled"),
  new_password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, and one digit"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});
const initialValues = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};
export const ChangePassword = () => {
  const { data, isLoading, error, fetchData, postData } = useFetch();
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);

    postData(
      {
        passwordData: {
          ...values,
        },
      },
      `users/passwordchange`
    );
  };
  return (
    <Formik initialValues={{ ...initialValues }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <StyledForm>
        <Container>
          <Label htmlFor="">Old Password *</Label>
          <Input type="password" name="old_password" id="old_password" autoComplete="off" placeholder="" />
          <ErrorMsg name="old_password" component="div" className="error" />
        </Container>
        <Container>
          <Label htmlFor="">New Password *</Label>
          <Input type="password" name="new_password" id="new_password" autoComplete="off" placeholder="" />
          <ErrorMsg name="new_password" component="div" className="error" />
        </Container>
        <Container>
          <Label htmlFor="">Confirm Password *</Label>
          <Input type="password" name="confirm_password" id="confirm_password" autoComplete="off" placeholder="" />
          <ErrorMsg name="confirm_password" component="div" className="error" />
        </Container>
        <Container>
          <SubmitButton type="submit">Update Password</SubmitButton>
        </Container>
      </StyledForm>
    </Formik>
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
