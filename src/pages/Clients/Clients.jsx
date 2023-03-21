import * as Icon from 'react-feather'
import styled from 'styled-components'

export const Clients = () => {
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <Icon.Users />
          <Title>Clients</Title>
        </TitleWrapper>
        <AddButton>Add New Client</AddButton>
      </TitleSection>
      <DetailSection>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadData>Company</TableHeadData>
              <TableHeadData>Contact</TableHeadData>
              <TableHeadData>Country</TableHeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableData>Alfreds Futterkiste</TableData>
              <TableData>Maria Anders</TableData>
              <TableData>Germany</TableData>
            </TableRow>
            <TableRow>
              <TableData>Centro comercial Moctezuma</TableData>
              <TableData>Francisco Chang</TableData>
              <TableData>Mexico</TableData>
            </TableRow>
          </TableBody>
        </Table>
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
  padding: 1em;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding 1em;
  border-radius:  0 0 4px 4px;
`
const Title = styled.div`
  padding-left: 8px;
  font-family:'Cabin-bold';
`

const TitleWrapper = styled.div`
  display: flex;
`
const AddButton = styled.div`
  font-size: 12px;
  background-color: var(--button-add-color);
  color: var(--white-color);
  padding 0.65em;
  border-radius:4px;
  cursor:pointer;
`
const Table = styled.table`
  width: 100%;
  border: 1px solid var(--table-border-color);
  border-collapse: collapse;
  font-size: 14px;
  color: #333333;
  overflow-x: auto;
`
const TableHead = styled.thead`
  border-bottom: 2px solid var(--table-border-color);
`
const TableRow = styled.tr``
const TableBody = styled.tbody`
  background-color: var(--table-cell-color);
`
const TableData = styled.td`
  border-right: 1px solid var(--table-border-color);
  border-bottom: 1px solid var(--table-border-color);
  text-align: left;
  padding:8px;
  font-family:'Cabin-Regular'
`
const TableHeadData = styled.th`
  border-right: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: 'Cabin-Bold';
`
