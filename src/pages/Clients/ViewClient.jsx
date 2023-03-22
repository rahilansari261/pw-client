import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'

export const ViewClient = () => {
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Update client</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>All input boxes will appear here...</DetailSection>
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
