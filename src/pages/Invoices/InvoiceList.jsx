import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { Pagination } from '../../components/Pagination'
import { Table } from '../../components/Table'

export const InvoiceList = () => {
  const invoiceData = [
    {
      _id: '1',
      No: '23',
      FY: '22-23',
      date: '30-Mar-2023',
      client: 'Rahil',
      comapny: 'Rahil Communications',
      amount: 17700,
      due: 17700,
    },
    {
      _id: '2',
      No: '23',
      FY: '22-23',
      date: '30-Mar-2023',
      client: 'Rahil',
      comapny: 'Rahil Communications',
      amount: 17700,
      due: 17700,
    },
    {
      _id: '3',
      No: '23',
      FY: '22-23',
      date: '30-Mar-2023',
      client: 'Rahil',
      comapny: 'Rahil Communications',
      amount: 17700,
      due: 17700,
    },
  ]
  const clickHandle = () => {}
  const btnFunc = () => {}
  const tableHelperData = {
    actionColumnSrc: '/invoices/viewinvoice/',
    actionColumnTitle: 'Action',
    actionColumnValue: 'View',
    actionColumnColor: 'info',
    tableHeadRowData: Object.keys(invoiceData[0]),
    actionColumnButtonFunc: btnFunc,
  }

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Invoices</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Link to='/invoices/addinvoice'>
            <Button label='success' clickHandle={() => {}}>
              Add New Invoice
            </Button>
          </Link>
          <Link to='/invoices/invoicereport'>
            <Button label='primary' clickHandle={() => {}}>
              Invoice Report
            </Button>
          </Link>
        </ButtonWrapper>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type='text' placeholder='Search' />
            <Button label='info' clickHandle={clickHandle}>
              Search
            </Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>
        <Table tableData={invoiceData} tableHelperData={tableHelperData} />
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
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`
