import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name Must be filled"),
  code: Yup.string().required("Product Code Must be filled"),  
});

const initialValues = {
  name: "",
  code: "",
  tax: "",
};

export const AddProduct = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log("submit called");
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faBagShopping} />
          <Title>Add new product</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <StyledForm>
            <Container>
              <Label htmlFor="">Product Name *</Label>
              <Input type="text" name="name" id="name" autoComplete="off" placeholder="Name of your product" />
              <ErrorMsg name="name" component="div" className="error" />
            </Container>
            <Container>
              <Label htmlFor="">Product Code *</Label>
              <Input type="text" name="code" id="code" autoComplete="off" placeholder="" />
              <ErrorMsg name="code" component="div" className="error" />
            </Container>
            <Container>
              <Label htmlFor="">Product Description </Label>
              <TextArea as="textarea" type="text" name="desc" id="desc" autoComplete="off" placeholder="" rows="2" />
            </Container>
            <Container>
              <Label htmlFor="">Product Price *</Label>

              <Input type="number" name="price" id="price" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <Label htmlFor="">Product Tax *</Label>
              <StyledSelect as="select" name="tax" id="tax">
              <option value="">Select Tax</option>
                <option value="gst@10">GST @ 10</option>
                <option value="gst@12">GST @ 12</option>
                <option value="gst@16">GST @ 16</option>
                <option value="gst@18">GST @ 18</option>
              </StyledSelect>              
            </Container>
            <Container>
              <Label htmlFor="">Product Unit *</Label>
              <Input type="number" name="unit" id="unit" autoComplete="off" placeholder="" />
            </Container>
            <Container>
              <SubmitButton type="submit">Save Product</SubmitButton>
            </Container>
          </StyledForm>
        </Formik>
      </DetailSection>
    </Main>
  );
};

const Main = styled.div`
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
  padding: 0em 1em 1em;
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
  width: 100%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;

const TextArea = styled(Field)`
  background-color: var(--white-color);
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
`;
const StyledSelect = styled(Field)`
  background-color: var(--white-color);
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
`;
