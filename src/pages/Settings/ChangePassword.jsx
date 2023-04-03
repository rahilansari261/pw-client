import styled from 'styled-components'
import { Button } from '../../components/Button'

export const ChangePassword = () => {
  const clickHandle = () => {}
  return (
    <>
      <Form>
        <FormElement>
          <Label htmlFor=''>Old Password *</Label>
          <Input
            type='password'
            name='old_password'
            id='old_password'
            autoComplete='off'
            placeholder=''
          />
        </FormElement>
        <FormElement>
          <Label htmlFor=''>New Password *</Label>
          <Input
            type='password'
            name='new_password'
            id='new_password'
            autoComplete='off'
            placeholder='new password'
          />
        </FormElement>
        <FormElement>
          <Label htmlFor=''>Confirm Password *</Label>
          <Input
            type='password'
            name='confirm_password'
            id='confirm_password'
            autoComplete='off'
            placeholder='confirm password'
          />
        </FormElement>
      </Form>

      <FormElement>
        <Button label='success' clickHandle={() => clickHandle('')}>
          Update Password
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
