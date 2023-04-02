import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { useState } from 'react'
const settingInitObj = {
  profile: 'info',
  settings: 'info',
  password: 'info',
  subscription: 'info',
}
export const Settings = () => {
  const [settingsObj, setSettingsObj] = useState({
    profile: 'primary',
    settings: 'info',
    password: 'info',
    subscription: 'info',
  })
  const [title, setTitle] = useState('profile')
  const clickHandle = (settingType) => {
    setSettingsObj({ ...settingInitObj, [settingType]: 'primary' })
    setTitle(settingType)
  }
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faGears} />
          <Title>{title}</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Button
            label={settingsObj.profile}
            clickHandle={() => clickHandle('profile')}
          >
            Profile
          </Button>
          <Button
            label={settingsObj.settings}
            clickHandle={() => clickHandle('settings')}
          >
            Settings
          </Button>
          <Button
            label={settingsObj.password}
            clickHandle={() => clickHandle('password')}
          >
            Password
          </Button>
          <Button
            label={settingsObj.subscription}
            clickHandle={() => clickHandle('subscription')}
          >
            Subscription
          </Button>
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        <Form>
          <FormElement>
            <Label htmlFor=''>Company Name </Label>
            <div style={{ flex: 2 }}>Subuyan Enterprises</div>
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
              Please note these information will be used in invoices. Please
              check before saving them.
            </FootNote>
          </FormElement>
        </Form>

        <FormElement>
          <Button label='success' clickHandle={() => clickHandle('')}>
            Save My Profile
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
  text-transform: capitalize;
`

const TitleWrapper = styled.div`
  display: flex;
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
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
const FootNote = styled.div`
  flex: 2;
  font-size: 12px;
`
