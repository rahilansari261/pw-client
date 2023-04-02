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
  const clickHandle = (settingType) => {    
    setSettingsObj({ ...settingInitObj, [settingType]: 'primary' })
  }
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faGears} />
          <Title>Settings</Title>
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
      <DetailSection></DetailSection>
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
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 1000px;
  overflow-x: auto;
  margin: 0 auto;
`

const Title = styled.div`
  padding-left: 8px;
  font-family: 'Cabin-bold';
`

const TitleWrapper = styled.div`
  display: flex;
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`
