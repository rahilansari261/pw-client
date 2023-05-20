import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Index";
export const Table = ({ tableData, tableHelperData }) => {
  return (
    <TableWrapper>
      <TableContent>
        <TableHead>
          <TableRow>
            {tableHelperData.tableHeadRowData.slice(1).map((item) => (
              <TableHeadData key={item} style={{ minWidth: "60px" }}>
                {item}
              </TableHeadData>
            ))}
            {tableHelperData.actionColumnTitle ? <TableHeadData style={{ minWidth: "120px", textAlign: "center" }}>{tableHelperData.actionColumnTitle}</TableHeadData> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((tableDataItem) => (
            <TableRow key={tableDataItem._id}>
              {Object.values(tableDataItem)
                .slice(1)
                .map((item, index) => (
                  <TableData key={index}>{item} </TableData>
                ))}
              {tableHelperData.actionColumnTitle ? (
                <TableData style={{ width: "120px", textAlign: "center" }}>
                  {tableHelperData.actionColumnSrc === null ? (
                    <Button label={tableHelperData.actionColumnColor} params={tableDataItem._id} clickHandle={tableHelperData.actionColumnButtonFunc}>
                      {tableHelperData.actionColumnValue}
                    </Button>
                  ) : (
                    <Link to={`${tableHelperData.actionColumnSrc}${tableDataItem._id}`}>
                      <Button label={tableHelperData.actionColumnColor} params="" clickHandle={tableHelperData.actionColumnButtonFunc}>
                        {tableHelperData.actionColumnValue}
                      </Button>
                    </Link>
                  )}
                </TableData>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </TableWrapper>
  );
};
const TableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;
const TableContent = styled.table`
  width: 100%;
  border: 1px solid var(--table-border-color);
  border-collapse: collapse;
  font-size: 14px;
  color: #333333;
`;
const TableHead = styled.thead`
  border-bottom: 2px solid var(--table-border-color);
`;
const TableRow = styled.tr``;
const TableBody = styled.tbody`
  background-color: var(--table-cell-color);
`;
const TableData = styled.td`
  border-right: 1px solid var(--table-border-color);
  border-bottom: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: "Cabin-Regular";
`;
const TableHeadData = styled.th`
  border-right: 1px solid var(--table-border-color);
  text-align: left;
  padding: 8px;
  font-family: "Cabin-Bold";
  text-transform: capitalize;
`;
