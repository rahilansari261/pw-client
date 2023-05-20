import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";

export const ViewProduct = () => {
  const clickHandle = () => {};

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faBagShopping} />
          <Title>Update Product</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <Form>
          <FormElement>
            <Label htmlFor="">Product Name *</Label>
            <Input type="text" name="name" id="name" autoComplete="off" placeholder="Name of your product" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Product Code *</Label>
            <Input type="text" name="code" id="code" autoComplete="off" placeholder="" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Product Description </Label>
            <TextArea type="text" name="desc" id="desc" autoComplete="off" placeholder="" rows="2" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Product Price *</Label>
            <Input type="number" name="price" id="price" autoComplete="off" placeholder="" />
          </FormElement>
          <FormElement>
            <Label htmlFor="">Product Tax *</Label>
            <Select name="tax" id="tax">
              <option value="gst@10">GST @ 10</option>
              <option value="gst@12">GST @ 12</option>
              <option value="gst@16">GST @ 16</option>
              <option value="gst@18">GST @ 18</option>
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="">Product Unit *</Label>
            <Input type="number" name="unit" id="unit" autoComplete="off" placeholder="" />
          </FormElement>
        </Form>
        <FormElement>
          <Button label="success" clickHandle={() => clickHandle("")}>
            Update
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
`;
const Input = styled.input`
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
  flex: 2;
`;

const TextArea = styled.textarea`
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
  flex: 2;
`;
const Select = styled.select`
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
  flex: 2;
`;
