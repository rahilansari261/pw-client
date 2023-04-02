import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'

export const AddClient = () => {
  const clickHandle = () => {}

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Add new client</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <Form>
          <FormElement>
            <Label htmlFor=''>Company Name *</Label>
            <Input
              type='text'
              name='company'
              id='company'
              autoComplete='off'
              placeholder='Name of Company to be used in invoices'
            />
          </FormElement>
          <FormElement>
            <Label htmlFor=''>Client Name *</Label>
            <Input
              type='text'
              name='client_name'
              id='client_name'
              autoComplete='off'
              placeholder=''
            />
          </FormElement>
          <FormElement>
            <Label htmlFor=''>Client Address *</Label>
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
            <Label htmlFor=''>Email *</Label>
            <Input
              type='email'
              name='email'
              id='email'
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
            <Label htmlFor=''>Client Notes </Label>
            <TextArea
              type='text'
              name='notes'
              id='notes'
              autoComplete='off'
              placeholder=''
              rows='2'
            />
          </FormElement>
        </Form>
        <FormElement>
          <Button label='success' clickHandle={() => clickHandle('')}>
            Save
          </Button>
        </FormElement>
      </DetailSection>
    </Main>
  )
}

const Main = styled.div`
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
`
const TitleSection = styled.div`
  background-color: var(--table-title-section);
  padding: 0.75em 1em;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
`

const Title = styled.div`
  padding-left: 8px;
  font-family: 'Cabin-bold';
`

const TitleWrapper = styled.div`
  display: flex;
`
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 1000px;
  overflow-x: auto;
  margin: 0 auto;
`
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
