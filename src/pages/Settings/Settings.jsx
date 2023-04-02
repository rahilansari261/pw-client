import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { useState } from 'react'
import { Profile } from './Profile'
import { ChangePassword } from './ChangePassword'
import { Subscription } from './Subscription'
import { TaxAndTerms } from './TaxAndTerms'
const settingInitObj = {
  profile: 'info',
  taxes: 'info',
  password: 'info',
  subscription: 'info',
}
export const Settings = () => {
  const [settingsObj, setSettingsObj] = useState({
    profile: 'primary',
    taxes: 'info',
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
            label={settingsObj.taxes}
            clickHandle={() => clickHandle('taxes')}
          >
            Taxes
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
        {(() => {
          switch (title) {
            case 'profile':
              return <Profile />
              break
            case 'taxes':
              return <TaxAndTerms />
              break
            case 'password':
              return <ChangePassword />
              break
            case 'subscription':
              return <Subscription />
              break

            default:
              return <Profile />
          }
        })()}
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
