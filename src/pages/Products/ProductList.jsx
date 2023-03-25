import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { Pagination } from '../../components/Pagination'

export const ProductList = () => {
  const clientData = [
    {
      _id: '1',
      comapny: 'Satyam Computers',
      name: 'Satyam Kumar',
      phone: '9878642748',
    },
    {
      _id: '2',
      comapny: 'Satyam Computers',
      name: 'Satyam Kumar',
      phone: '9878642748',
    },
    {
      _id: '3',
      comapny: 'Satyam Computers',
      name: 'Satyam Kumar',
      phone: '9878642748',
    },
    {
      _id: '4',
      comapny: 'Satyam Computers',
      name: 'Satyam Kumar',
      phone: '9878642748',
    },
  ]
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Products</Title>
        </TitleWrapper>
        <Link to='/products/addproduct'>
          <Button label='primary'>Add New Product</Button>
        </Link>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type='text' />
            <Button label='info'>Search</Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadData>Company</TableHeadData>
              <TableHeadData>Name</TableHeadData>
              <TableHeadData>Phone No.</TableHeadData>
              <TableHeadData>Action</TableHeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData.map((client) => (
              <TableRow key={client._id}>
                <TableData>{client.comapny} </TableData>
                <TableData>{client.name} </TableData>
                <TableData>{client.phone}</TableData>
                <TableData>
                  <Link to='/clients/viewclient/1'>
                    <Button label='info'>View</Button>
                  </Link>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination />
      </DetailSection>
      <Outlet />
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
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const SearchBar = styled.div`
  display: flex;
  width: 40%;
  gap: 12px;
  align-items: center;
  @media (max-width: 550px) {
    width: 70%;
  }
`
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
`
const SearchDesc = styled.div``
const Title = styled.div`
  padding-left: 8px;
  font-family: 'Cabin-bold';
`

const TitleWrapper = styled.div`
  display: flex;
`

const Table = styled.table`
  width: 100%;
  border: 1px solid var(--table-border-color);
  border-collapse: collapse;
  font-size: 14px;
  color: #333333;
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
  padding: 8px;
  font-family: 'Cabin-Regular';
`
const TableHeadData = styled.th`
  border-right: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: 'Cabin-Bold';
`
