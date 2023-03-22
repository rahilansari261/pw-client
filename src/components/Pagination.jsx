import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faBackwardStep,
  faForwardStep,
  faForward,
  faBackward,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
export const Pagination = () => {
  return (
    <PaginationWrapper>
      <SearchDesc>Showing Page No 1 of 10 of search All</SearchDesc>
      <PaginIcons>
        <PageIconWrapper>
          <FontAwesomeIcon icon={faBackwardStep} />
        </PageIconWrapper>
        <PageIconWrapper>
          <FontAwesomeIcon icon={faBackward} />
        </PageIconWrapper>
        <PageIconWrapper>
          <FontAwesomeIcon icon={faForward} />
        </PageIconWrapper>
        <PageIconWrapper>
          <FontAwesomeIcon icon={faForwardStep} />
        </PageIconWrapper>
      </PaginIcons>
    </PaginationWrapper>
  )
}
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`
const SearchDesc = styled.div``

const PaginIcons = styled.div`
  display: flex;
  align-items: center;
`
const PageIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--table-border-color);
  cursor: pointer;
  &:hover {
    background-color: var(--table-cell-color);
  }
`
