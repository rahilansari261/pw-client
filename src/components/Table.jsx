import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './Button'
export const Table = ({ clientData, tableHelperData }) => {
  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          {tableHelperData.tableHeadRowData.slice(1).map((x) => (
            <TableHeadData key={x}>{x}</TableHeadData>
          ))}
          <TableHeadData>{tableHelperData.actionColumnTitle}</TableHeadData>
        </TableRow>
      </TableHead>
      <TableBody>
        {clientData.map((client) => (
          <TableRow key={client._id}>
            <TableData>{client.comapny} </TableData>
            <TableData>{client.name} </TableData>
            <TableData>{client.phone}</TableData>
            <TableData style={{ width: '100px' }}>
              <Link to={tableHelperData.actionColumnSrc}>
                <Button label='info'>
                  {tableHelperData.actionColumnValue}
                </Button>
              </Link>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  )
}

const TableWrapper = styled.table`
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
  text-transform: capitalize;
`
