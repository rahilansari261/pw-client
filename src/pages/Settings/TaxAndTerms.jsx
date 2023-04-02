import styled from 'styled-components'
import { Button } from '../../components/Button'

export const TaxAndTerms = () => {
  return (
    <>
      <Form>
        <FormElement>
          <Label htmlFor=''>Company Name </Label>
          <div style={{ flex: 2 }}>Tax</div>
        </FormElement>
        <FormElement>
          <Label htmlFor=''>Name *</Label>
          <Input
            type='text'
            name='name'
            id='name'
            autoComplete='off'
            placeholder=''
          />
        </FormElement>
        <FormElement>
          <Label htmlFor=''>GST No. *</Label>
          <Input
            type='text'
            name='gst'
            id='gst'
            autoComplete='off'
            placeholder=''
          />
        </FormElement>
        <FormElement>
          <Label htmlFor=''>Sevice Tax No. *</Label>
          <Input
            type='text'
            name='tax'
            id='tax'
            autoComplete='off'
            placeholder=''
          />
        </FormElement>

        <FormElement>
          <Label htmlFor=''>Phone *</Label>
          <Input
            type='number'
            name='phone'
            id='phone'
            autoComplete='off'
            placeholder=''
          />
        </FormElement>

        <FormElement>
          <Label htmlFor=''> Address *</Label>
          <TextArea
            type='text'
            name='address'
            id='address'
            autoComplete='off'
            placeholder=''
            rows='2'
          />
        </FormElement>
        <FormElement>
          <Label htmlFor=''> </Label>
          <FootNote>
            Please note these information will be used in invoices. <br />{' '}
            Please check before saving them.
          </FootNote>
        </FormElement>
      </Form>

      <FormElement>
        <Button label='success' clickHandle={() => clickHandle('')}>
          Save My Profile
        </Button>
      </FormElement>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FormElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 2em; */
  margin-bottom: 1em;
  min-width: 500px;
`

const Label = styled.label`
  flex: 1;
`
const Input = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 40%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  flex: 2;
`

const TextArea = styled.textarea`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 40%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
  flex: 2;
`
const FootNote = styled.div`
  flex: 2;
  font-size: 12px;
`
